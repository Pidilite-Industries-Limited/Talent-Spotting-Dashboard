import { useState, useEffect } from "react";
import CommentsTextarea from "./CommentsTextarea.jsx";
import { api } from "../utilities/api.js"

export default function AssessmentResults({ empData, userRole, onSubmit }) {
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [assessmentFeedback, setAssessmentFeedback] = useState("");
  const [aptitudeScore, setAptitudeScore] = useState(0);
  const [aptitudeFeedback, setAptitudeFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (empData) {
      setAssessmentScore(empData.technicalassessmentscore || 0)
      setAssessmentFeedback(empData.assessmentfeedback || "");
      setAptitudeScore(empData.cognitiveaptitudescore || 0)
      setAptitudeFeedback(empData.aptitudefeedback || "");
    } else {
      setAptitudeScore(0)
      setAssessmentFeedback("");
      setAssessmentScore(0);
      setAptitudeFeedback("");
    }
  }, [empData]);

  async function handleSubmit() {
    if (userRole !== "HR") {
      alert("Incorrect role!");
      return;
    }
    setIsSubmitting(true);
    try {
      const updated = await api(`/api/screening-feedback/${empData.id}`, {
        method: "PUT",
        body: {
          assessmentscore: Number(assessmentScore),
          assessmentfeedback: assessmentFeedback,
          aptitudescore: Number(aptitudeScore),
          aptitudefeedback: aptitudeFeedback,
        },
      });
      setAssessmentScore(updated.technicalassessmentscore ?? 0)
      setAssessmentFeedback(updated.assessmentfeedback ?? "");
      setAptitudeScore(updated.cognitiveaptitudescore ?? 0)
      setAptitudeFeedback(updated.aptitudefeedback ?? "");
      onSubmit();
      alert("Feedback updated successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to update feedback. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">fact_check</span>
          <h3 className="text-[#111318] dark:text-white text-lg font-bold">Assessment Results</h3>
        </div>
        {/* <span className="text-xs font-medium text-gray-500 bg-white dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600">Last updated: 2 days ago</span> */}
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#111318] dark:text-gray-200">Technical Assessment Score</label>
          <input className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111318] dark:text-white" max="100" min="0" type="number" value={assessmentScore} onChange={(e) => setAssessmentScore?.(e.target.value)} readOnly={userRole !== "HR"} />
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${assessmentScore}%` }}></div>
          </div>
          <CommentsTextarea
            label="Assessment Feedback"
            subLabel=""
            placeholder="Describe assessment feedback..."
            value={assessmentFeedback}
            onChange={setAssessmentFeedback}
            readOnly={userRole !== "HR"}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#111318] dark:text-gray-200">Cognitive Aptitude Score</label>
          <input className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111318] dark:text-white" max="100" min="0" type="number" value={aptitudeScore} onChange={(e) => setAptitudeScore?.(e.target.value)} readOnly={userRole !== "HR"} />
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
            <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${aptitudeScore}%` }}></div>
          </div>
          <CommentsTextarea
            label="Aptitude Feedback"
            subLabel=""
            placeholder="Describe aptitude feedback..."
            value={aptitudeFeedback}
            onChange={setAptitudeFeedback}
            readOnly={userRole !== "HR"}
          />
        </div>
      </div>
      {userRole === "HR" && (
        <div className="sticky bottom-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-4 px-6 w-full sm:w-auto">
            {/* <button className="flex-1 sm:flex-none border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Save Draft
                  </button> */}
            <button
              onClick={handleSubmit} disabled={isSubmitting}
              className="flex-1 sm:flex-none bg-primary hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-colors flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Submitting...' : 'Submit Assessment' }</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>)}

    </div>
  );
}