🧠 SEO Edge — AI-Powered SEO Analyzer

SEO Edge is a modern SEO audit tool built with Next.js 14, Gemini AI API, and Radix UI components.
It analyzes any website’s SEO health, including meta tags, content quality, performance, and mobile optimization — all beautifully visualized in an interactive dashboard.

<p align="center"> <img src="https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs" /> <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss" /> <img src="https://img.shields.io/badge/Gemini%20API-AI%20Powered-FF5757?logo=google" /> <img src="https://img.shields.io/badge/License-MIT-green" /> </p>
🚀 Live Demo

🔗 seo-edge.vercel.app
 (if deployed)

Paste a website URL → Click “Analyze SEO” → See your full SEO score breakdown and recommendations instantly.

✨ Features

✅ AI-Powered SEO Audit — Uses Gemini API to analyze meta tags, content structure, and page performance.
✅ SEO Scoring System — Calculates an overall score + sub-scores for Meta, Content, Performance, Mobile.
✅ Detailed Breakdown Tabs — View issues, recommendations, and technical SEO details.
✅ Modern, Animated UI — Built with Framer Motion, TailwindCSS, and Radix Primitives for seamless UX.
✅ Responsive + Accessible — Works across all devices with keyboard and screen-reader support.
✅ Beautiful Loading & Result States — Clean transitions between form → loading → report.

🧩 Tech Stack
Layer	Technology
Frontend Framework	Next.js 14 (App Router, React Server Components)
Styling	TailwindCSS + Class Variance Authority (CVA)
Components	Radix UI + Lucide Icons + Framer Motion
AI Engine	Google Gemini API (SEO Analysis via prompt-based evaluation)
Deployment	Vercel
State Management	React Hooks, Suspense, useTransition
📂 Project Structure
seo-edge/
├── app/
│   ├── page.tsx                # Landing page with SeoForm
│   ├── results/page.tsx        # SEO Results page
│   ├── actions.ts              # Server actions (calls analyzeSeo)
│   ├── layout.tsx              # Root layout with metadata
│
├── components/
│   ├── seo-form.tsx            # Input form for URL analysis
│   ├── seo-results.tsx         # Result summary and score visualization
│   ├── seo-tabs.tsx            # Issues, Recommendations, Details
│   ├── ui/                     # Reusable shadcn components (button, card, tabs, input, etc.)
│   ├── loading.tsx             # Full-screen loading component
│
├── lib/
│   ├── utils.ts                # Utility functions (classNames, formatters)
│
├── public/                     # Assets (icons, og-images)
└── README.md                   # You’re here

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/<your-username>/seo-edge.git
cd seo-edge

2. Install dependencies
npm install
# or
yarn install

3. Set up environment variables

Create a .env.local file in the root directory and add:

GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000

4. Run the development server
npm run dev


Visit: http://localhost:3000

5. Build for production
npm run build
npm start

🧠 How It Works

User enters a website URL
→ The app validates and formats it.

AI SEO Analysis (via Gemini)
→ A server action (analyzeSeo) sends the URL to Gemini for deep inspection of:

Meta title & description completeness

Keyword usage & density

Headings and semantic HTML

Page speed, mobile usability, and content structure

Result Computation
→ Each section is scored from 0–100 and averaged into an overall SEO score.

Visualization
→ Interactive cards + tabbed breakdowns show:

Issues (critical + warnings)

Recommendations (impact level)

Technical details (meta tags, headings, content status)

🧩 Core Components Overview
Component	Responsibility
SeoForm	URL input + validation logic
SeoResults	Displays scores and summaries
TabsContainer	Tabbed details for issues/recommendations
ScoreCard	Individual category performance cards
Progress	Animated progress bars with variants
Card, Button, Input, Tabs	Reusable design system components
Loading	Full-screen animated loader during analysis
🖼️ UI Preview

Here’s how the app flows 👇
1️⃣ Enter URL → 2️⃣ Loading State → 3️⃣ SEO Report with Scores

🧠 SEO Edge

[ example.com ] [ Analyze SEO ]

Analyzing... 🔄

✅ Meta Tags: 80/100
⚙️ Performance: 73/100
📱 Mobile: 90/100
📰 Content: 68/100

🧰 Developer Notes

Uses Suspense for async data fetching (Next.js RSC-friendly).

All color logic (score → badge → progress color) is consistent across components.

Framer Motion handles UI motion for every major transition.

Fully responsive down to 360px width.

🧪 Future Improvements

 Add Lighthouse API integration for deeper performance audits

 Store historical SEO reports (Supabase / MongoDB)

 User authentication for saving results

 PDF report export

 Live progress updates from analysis worker

🧑‍💻 Author

👤 Santanu Singh
💻 Software Developer | ⚡ Web Engineer | 🧠 AI Enthusiast
🔗 Portfolio

📧 Contact

🪪 License

This project is licensed under the MIT License.
Feel free to fork, modify, and use for your own SEO tools — just credit SEO Edge.

🌟 Acknowledgements

Next.js
 — for the robust React framework

Google Gemini API
 — for SEO analysis intelligence

TailwindCSS
 — for styling

Radix UI
 — for accessible primitives

Lucide Icons
 — for icons

Framer Motion
 — for UI animations