import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResumeUpload = () => {
  const [uploaded, setUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
  };

  const skills = ["Python", "React.js", "Machine Learning", "Django", "SQL", "Git", "REST APIs", "NLP"];
  const details = [
    { label: "Name", value: "K. Sumanth" },
    { label: "Education", value: "B.Tech CSE, Krishna University" },
    { label: "CGPA", value: "8.5" },
    { label: "Projects", value: "3 listed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Resume Analysis</h1>
        <p className="text-muted-foreground mt-1">Upload your resume for AI-powered skill extraction.</p>
      </div>

      {!uploaded ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
            dragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleUpload();
          }}
          onClick={handleUpload}
        >
          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-1">Drag & drop your resume here</p>
          <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOCX (Max 10MB)</p>
          <Button variant="accent" size="sm">
            Browse Files
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Upload success */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <div>
              <p className="font-medium text-foreground text-sm">Resume uploaded successfully!</p>
              <p className="text-xs text-muted-foreground">resume_sumanth.pdf · 245 KB</p>
            </div>
          </div>

          {/* Extracted Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-card shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-foreground">Extracted Details</h3>
              </div>
              <div className="space-y-3">
                {details.map((d) => (
                  <div key={d.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{d.label}</span>
                    <span className="font-medium text-foreground">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card shadow-card border border-border/50">
              <h3 className="font-semibold text-foreground mb-4">Extracted Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={() => setUploaded(false)}>
            Upload a different resume
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeUpload;
