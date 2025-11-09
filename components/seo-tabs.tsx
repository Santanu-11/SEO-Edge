"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabsContainerProps {
  results: {
    issues: {
      title: string;
      description: string;
      severity: "high" | "medium" | "low";
    }[];
    recommendations: {
      title: string;
      description: string;
      impact: "high" | "medium" | "low";
    }[];
    metaTagsDetails: DetailItem[];
    contentDetails: DetailItem[];
    technicalDetails: DetailItem[];
  };
}

interface DetailItem {
  name: string;
  value: string;
  status: "good" | "warning" | "bad";
}

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

export function TabsContainer({ results }: TabsContainerProps) {
  const [activeTab, setActiveTab] = React.useState<"issues" | "recommendations" | "details">("issues");

  const tabs = [
    { id: "issues", label: `Issues (${results.issues.length})` },
    { id: "recommendations", label: "Recommendations" },
    { id: "details", label: "Details" },
  ] as const;

  return (
    <div className="rounded-xl border bg-white shadow-sm p-4 md:p-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 min-w-[120px] py-3 text-sm md:text-base font-semibold text-center transition-all border-b-2",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeTab === "issues" && (
            <motion.div
              key="issues"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <IssuesTab issues={results.issues} />
            </motion.div>
          )}
          {activeTab === "recommendations" && (
            <motion.div
              key="recommendations"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <RecommendationsTab recommendations={results.recommendations} />
            </motion.div>
          )}
          {activeTab === "details" && (
            <motion.div
              key="details"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <DetailsTab results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Issues Tab ---------- */
function IssuesTab({ issues }: { issues: TabsContainerProps["results"]["issues"] }) {
  if (!issues.length)
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold">No Critical Issues Found</h3>
        <p className="text-muted-foreground">
          Great job! Check recommendations for further improvements.
        </p>
      </div>
    );

  return (
    <>
      {issues.map((issue, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02 }}
          className="rounded-lg border bg-white shadow-sm p-4 transition-all"
        >
          <div className="flex items-start gap-3 mb-2">
            {getSeverityIcon(issue.severity)}
            <div>
              <h4 className="font-bold text-lg">{issue.title}</h4>
              <div
                className={cn(
                  "inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-semibold text-white",
                  getSeverityColor(issue.severity)
                )}
              >
                {issue.severity.toUpperCase()} PRIORITY
              </div>
            </div>
          </div>
          <p className="text-sm text-foreground/80">{issue.description}</p>
        </motion.div>
      ))}
    </>
  );
}

/* ---------- Recommendations Tab ---------- */
function RecommendationsTab({
  recommendations,
}: {
  recommendations: TabsContainerProps["results"]["recommendations"];
}) {
  if (!recommendations.length)
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold">No Recommendations!</h3>
        <p className="text-muted-foreground">Everything seems optimized 🎉</p>
      </div>
    );

  return (
    <>
      {recommendations.map((rec, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02 }}
          className="rounded-lg border bg-white shadow-sm p-4 transition-all"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-lg">{rec.title}</h4>
            <span
              className={cn(
                "inline-block rounded-full px-2 py-0.5 text-xs font-semibold text-white",
                getImpactColor(rec.impact)
              )}
            >
              {rec.impact.toUpperCase()} IMPACT
            </span>
          </div>
          <p className="text-sm text-foreground/80">{rec.description}</p>
        </motion.div>
      ))}
    </>
  );
}

/* ---------- Details Tab ---------- */
function DetailsTab({ results }: { results: TabsContainerProps["results"] }) {
  const sections = [
    { title: "Meta Tags", items: results.metaTagsDetails },
    { title: "Content Analysis", items: results.contentDetails },
    { title: "Technical SEO", items: results.technicalDetails },
  ];

  return (
    <>
      {sections.map((section, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.01 }}
          className="rounded-lg border bg-white shadow-sm p-4 transition-all"
        >
          <h3 className="text-xl font-bold mb-3">{section.title}</h3>
          <div className="divide-y divide-border">
            {section.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start py-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-sm text-right text-muted-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </>
  );
}

/* ---------- Utility Functions ---------- */
function getSeverityIcon(severity: "high" | "medium" | "low") {
  const map = {
    high: <XCircle className="h-5 w-5 text-red-500" />,
    medium: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    low: <AlertCircle className="h-5 w-5 text-blue-500" />,
  };
  return map[severity];
}

function getSeverityColor(severity: "high" | "medium" | "low") {
  const map = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-blue-500",
  };
  return map[severity];
}

function getImpactColor(impact: "high" | "medium" | "low") {
  const map = {
    high: "bg-green-600",
    medium: "bg-blue-600",
    low: "bg-gray-500",
  };
  return map[impact];
}

function getStatusIcon(status: "good" | "warning" | "bad") {
  const map = {
    good: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    bad: <XCircle className="h-5 w-5 text-red-500" />,
  };
  return map[status];
}
