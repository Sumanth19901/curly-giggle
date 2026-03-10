import { motion } from "framer-motion";
import { BookOpen, Clock, ExternalLink, CheckCircle2 } from "lucide-react";

const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation Strengthening",
    duration: "2 weeks",
    completed: true,
    items: [
      { name: "Data Structures & Algorithms", resource: "LeetCode / GeeksforGeeks", done: true },
      { name: "SQL Advanced Queries", resource: "HackerRank SQL Track", done: true },
      { name: "Git & Version Control", resource: "Atlassian Git Tutorial", done: false },
    ],
  },
  {
    phase: "Phase 2",
    title: "Backend & DevOps",
    duration: "3 weeks",
    completed: false,
    items: [
      { name: "Node.js & Express", resource: "Udemy Course", done: false },
      { name: "Docker Basics", resource: "Docker Official Docs", done: false },
      { name: "CI/CD Pipelines", resource: "GitHub Actions Guide", done: false },
    ],
  },
  {
    phase: "Phase 3",
    title: "Advanced & Specialization",
    duration: "3 weeks",
    completed: false,
    items: [
      { name: "TypeScript Deep Dive", resource: "TypeScript Handbook", done: false },
      { name: "System Design Basics", resource: "Grokking System Design", done: false },
      { name: "MongoDB & Redis", resource: "MongoDB University", done: false },
    ],
  },
];

const LearningRoadmap = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Learning Roadmap</h1>
        <p className="text-muted-foreground mt-1">Your personalized path to placement readiness.</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-6">
          {roadmap.map((phase, idx) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.12 }}
              className="md:pl-14 relative"
            >
              {/* Timeline dot */}
              <div
                className={`hidden md:flex absolute left-3 top-6 w-5 h-5 rounded-full border-2 items-center justify-center ${
                  phase.completed
                    ? "bg-accent border-accent"
                    : "bg-card border-border"
                }`}
              >
                {phase.completed && <CheckCircle2 className="w-3 h-3 text-accent-foreground" />}
              </div>

              <div className="p-6 rounded-xl bg-card shadow-card border border-border/50">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-accent">{phase.phase}</span>
                    <h3 className="font-semibold text-foreground">{phase.title}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {phase.duration}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {phase.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            item.done
                              ? "bg-accent border-accent"
                              : "border-border"
                          }`}
                        >
                          {item.done && <CheckCircle2 className="w-3 h-3 text-accent-foreground" />}
                        </div>
                        <span className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {item.resource}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap;
