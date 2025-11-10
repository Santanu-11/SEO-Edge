"use server";

import { redirect } from "next/navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";

//@ts-ignore
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function submitUrl(data: any, formData: FormData) {
  const url = formData.get("url") as string;

  if (!url) return { error: "Please enter a URL" };

  let formattedUrl = url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    formattedUrl = `https://${url}`;
  }

  try {
    new URL(formattedUrl); // Validate URL
    redirect(`/results?url=${encodeURIComponent(formattedUrl)}`);
  } catch (err) {
    console.log(err);
    return { error: "Please enter a valid URL" };
  }
}

export async function analyzeSeo(url: string) {
  try {
    // Fetch website content
    const response = await fetch(url, {
      headers: { "User-Agent": "SEO-Inspector-Bot/1.0" },
    });

    if (!response.ok)
      throw new Error(`Failed to fetch website: ${response.status}`);

    const html = await response.text();

    // Extract basic SEO elements
    const title = extractTag(html, "title");
    const metaDescription = extractMetaTag(html, "description");
    const h1Tags = extractAllTags(html, "h1");
    const h2Tags = extractAllTags(html, "h2");
    const imgTags = extractAllImgTags(html);

    const seoData = {
      url,
      title,
      metaDescription,
      h1Count: h1Tags.length,
      h1Tags: h1Tags.slice(0, 5),
      h2Count: h2Tags.length,
      h2Tags: h2Tags.slice(0, 5),
      imgCount: imgTags.length,
      imagesWithoutAlt: imgTags.filter((img) => !img.alt).length,
      wordCount: countWords(stripHtml(html)),
      hasCanonical: html.includes('rel="canonical"'),
      hasSitemap: html.toLowerCase().includes("sitemap"),
      hasRobotsTxt: html.toLowerCase().includes("robots.txt"),
      hasSchema:
        html.includes("application/ld+json") || html.includes("itemtype="),
      hasFavicon:
        html.includes('rel="icon"') || html.includes('rel="shortcut icon"'),
      hasViewport: html.includes('name="viewport"'),
      hasHttps: url.startsWith("https://"),
    };

    console.log("SEO data length:", JSON.stringify(seoData).length);

    // 🧠 Send to Gemini
    const prompt = `
You are an SEO expert assistant. Analyze the website data below and return a JSON object with the exact structure requested.

Website data:
${JSON.stringify(seoData, null, 2)}

Return ONLY a valid JSON object with this structure:
{
  "metaTagsScore": number (0-100),
  "contentScore": number (0-100),
  "performanceScore": number (0-100),
  "mobileScore": number (0-100),
  "issues": [
    {
      "title": string,
      "description": string,
      "severity": "high" | "medium" | "low"
    }
  ],
  "recommendations": [
    {
      "title": string,
      "description": string,
      "impact": "high" | "medium" | "low"
    }
  ],
  "metaTagsDetails": [
    {
      "name": string,
      "value": string,
      "status": "good" | "warning" | "bad"
    }
  ],
  "contentDetails": [
    {
      "name": string,
      "value": string,
      "status": "good" | "warning" | "bad"
    }
  ],
  "technicalDetails": [
    {
      "name": string,
      "value": string,
      "status": "good" | "warning" | "bad"
    }
  ]
}
Make sure the response is valid JSON with no extra text, Markdown, or explanation.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Gemini might sometimes include Markdown fences — strip them
    const cleaned = text
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    console.log(cleaned);

    const analysisResult = JSON.parse(cleaned);
    return analysisResult;
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    return {
      metaTagsScore: 0,
      contentScore: 0,
      performanceScore: 0,
      mobileScore: 0,
      issues: [
        {
          title: "Error analyzing website",
          description: `We encountered an error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          severity: "high",
        },
      ],
      recommendations: [
        {
          title: "Check website accessibility",
          description:
            "Ensure the website is public and not blocking crawlers.",
          impact: "high",
        },
      ],
      metaTagsDetails: [],
      contentDetails: [],
      technicalDetails: [],
    };
  }
}

// Helper functions
function extractTag(html: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, "i");
  const match = html.match(regex);
  return match ? match[1].trim() : "";
}

function extractMetaTag(html: string, name: string): string {
  const regex = new RegExp(
    `<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>|<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["'][^>]*>`,
    "i"
  );
  const match = html.match(regex);
  return match ? (match[1] || match[2] || "").trim() : "";
}

function extractAllTags(html: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, "gi");
  return [...html.matchAll(regex)].map((m) => m[1].trim());
}

function extractAllImgTags(html: string): { src: string; alt: string }[] {
  const regex =
    /<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>|<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*>/gi;
  const matches = html.matchAll(regex);
  const results: { src: string; alt: string }[] = [];

  for (const match of matches) {
    if (match[1]) results.push({ src: match[1], alt: match[2] || "" });
    else if (match[4]) results.push({ src: match[4], alt: match[3] || "" });
  }
  return results;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
