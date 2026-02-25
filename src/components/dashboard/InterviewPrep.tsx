import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const interviewData = [
  {
    category: "Technical",
    questions: [
      {
        q: "Explain the difference between REST and GraphQL APIs.",
        tip: "Focus on data fetching flexibility, over-fetching, and use cases for each.",
      },
      {
        q: "What is the time complexity of common sorting algorithms?",
        tip: "Compare Quick Sort (O(n log n) avg), Merge Sort (O(n log n)), and Bubble Sort (O(n²)).",
      },
      {
        q: "How does React's virtual DOM work?",
        tip: "Explain reconciliation, diffing algorithm, and why it improves performance.",
      },
    ],
  },
  {
    category: "Behavioral",
    questions: [
      {
        q: "Tell me about a challenging project you worked on.",
        tip: "Use the STAR method: Situation, Task, Action, Result.",
      },
      {
        q: "How do you handle tight deadlines?",
        tip: "Mention prioritization, communication with team, and examples of delivery.",
      },
    ],
  },
  {
    category: "System Design",
    questions: [
      {
        q: "Design a URL shortener like bit.ly.",
        tip: "Cover hashing, database schema, caching layer, and scaling considerations.",
      },
      {
        q: "How would you design a real-time chat application?",
        tip: "Discuss WebSockets, message queues, data storage, and scaling strategies.",
      },
    ],
  },
];

const InterviewPrep = () => {
  const [expandedCat, setExpandedCat] = useState<string | null>("Technical");
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Interview Preparation</h1>
        <p className="text-muted-foreground mt-1">Role-specific questions based on your target positions.</p>
      </div>

      <div className="space-y-4">
        {interviewData.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.08 }}
            className="rounded-xl bg-card shadow-card border border-border/50 overflow-hidden"
          >
            <button
              onClick={() => setExpandedCat(expandedCat === cat.category ? null : cat.category)}
              className="w-full flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-accent" />
                <span className="font-semibold text-foreground">{cat.category}</span>
                <span className="text-xs text-muted-foreground">({cat.questions.length} questions)</span>
              </div>
              {expandedCat === cat.category ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            <AnimatePresence>
              {expandedCat === cat.category && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    {cat.questions.map((question) => {
                      const qKey = `${cat.category}-${question.q}`;
                      return (
                        <div
                          key={qKey}
                          className="p-4 rounded-lg bg-secondary/30 border border-border/30"
                        >
                          <button
                            onClick={() => setExpandedQ(expandedQ === qKey ? null : qKey)}
                            className="w-full text-left flex items-start justify-between gap-3"
                          >
                            <span className="text-sm font-medium text-foreground">{question.q}</span>
                            <Lightbulb className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors ${expandedQ === qKey ? "text-accent" : "text-muted-foreground"}`} />
                          </button>
                          <AnimatePresence>
                            {expandedQ === qKey && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 pt-3 border-t border-border/30 flex items-start gap-2">
                                  <Lightbulb className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                                  <p className="text-xs text-muted-foreground leading-relaxed">{question.tip}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrep;
