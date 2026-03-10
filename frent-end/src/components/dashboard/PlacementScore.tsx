import { motion } from "framer-motion";

const PlacementScore = () => {
  const score = 78;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="p-6 rounded-xl bg-card shadow-card border border-border/50">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8" className="stroke-secondary" />
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className="stroke-accent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{score}%</span>
            <span className="text-xs text-muted-foreground">Score</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-foreground mb-1">Placement Readiness</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Based on your skills, experience, and academic profile, you have a <strong className="text-accent">high</strong> chance of placement.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Technical", value: "82%" },
              { label: "Soft Skills", value: "70%" },
              { label: "Projects", value: "85%" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-lg font-bold text-foreground">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementScore;
