import { motion } from "framer-motion";
import { Target, AlertTriangle, CheckCircle2 } from "lucide-react";

const roleSkills: Record<string, { required: string[]; have: string[]; missing: string[] }> = {
  "Full Stack Developer": {
    required: ["React.js", "Node.js", "MongoDB", "REST APIs", "TypeScript", "Docker", "Git", "SQL"],
    have: ["React.js", "REST APIs", "Git", "SQL"],
    missing: ["Node.js", "MongoDB", "TypeScript", "Docker"],
  },
  "Data Scientist": {
    required: ["Python", "Machine Learning", "Deep Learning", "SQL", "Pandas", "TensorFlow", "Statistics"],
    have: ["Python", "Machine Learning", "SQL"],
    missing: ["Deep Learning", "Pandas", "TensorFlow", "Statistics"],
  },
  "Backend Developer": {
    required: ["Django", "REST APIs", "SQL", "Docker", "Redis", "CI/CD", "Git"],
    have: ["Django", "REST APIs", "SQL", "Git"],
    missing: ["Docker", "Redis", "CI/CD"],
  },
};

const SkillGapAnalysis = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Skill Gap Analysis</h1>
        <p className="text-muted-foreground mt-1">Compare your skills against target job roles.</p>
      </div>

      <div className="space-y-6">
        {Object.entries(roleSkills).map(([role, data], roleIdx) => {
          const matchPercent = Math.round((data.have.length / data.required.length) * 100);
          return (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: roleIdx * 0.1 }}
              className="p-6 rounded-xl bg-card shadow-card border border-border/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent" />
                  <h3 className="font-semibold text-foreground">{role}</h3>
                </div>
                <span className="text-sm font-bold text-accent">{matchPercent}% match</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-secondary rounded-full mb-5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full gradient-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${matchPercent}%` }}
                  transition={{ duration: 0.8, delay: roleIdx * 0.1 }}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-muted-foreground">Skills You Have</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.have.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-xs font-medium text-muted-foreground">Missing Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.missing.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillGapAnalysis;
