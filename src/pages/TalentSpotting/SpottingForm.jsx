import { useState, useEffect, useMemo, useContext } from "react";
import SearchBar from "../../components/SearchBar";
import EmployeeCard from "../../components/EmployeeCard";
import CommentsTextarea from "../../components/CommentsTextarea.jsx";
import StarRating from "../../components/StarRating.jsx"
import { DataContext } from '../../utilities/DataProvider';
import { AuthContext } from "../../utilities/AuthProvider.jsx";
import { api } from "../../utilities/api.js";

function ConfirmationModal({ open, onClose, onProceed, pending = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] ${pending ? "cursor-not-allowed" : ""}`} onClick={!pending ? onClose : undefined} />

      <div className="relative z-[61] w-full max-w-md rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shadow-xl">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[28px] text-amber-500 dark:text-amber-400">warning</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Ratings below 3/5 detected
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                One or more competency ratings are below <strong>3/5</strong>. Are you sure you want to mark this employee as <strong>key talent</strong>?
                We recommend reviewing and adjusting your assessment before proceeding.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={!pending ? onClose : undefined} disabled={pending} autoFocus
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${pending ? "bg-slate-100 dark:bg-slate-800 opacity-60 cursor-not-allowed text-slate-800 dark:text-slate-200" : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"}`}
            >
              Review & Edit
            </button>

            <button
              onClick={onProceed} disabled={pending}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-bold transition-colors ${pending ? "bg-primary/70 cursor-not-allowed text-white" : "bg-primary/90 hover:bg-primary text-white shadow-md shadow-primary/20"}`}
            >
              Proceed anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpottingForm() {
  const { data, loading, error } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [otos_comment, setOtosComment] = useState("");
  const [otos_rating, setOtosRating] = useState(0);
  const [entrepreneur_comment, setEntrepreneurComment] = useState("");
  const [entrepreneur_rating, setEntrepreneurRating] = useState(0);
  const [dissatisfaction_comment, setDissatisfactionComment] = useState("");
  const [dissatisfaction_rating, setDissatisfactionRating] = useState(0);
  const [humility_comment, setHumilityComment] = useState("");
  const [humility_rating, setHumilityRating] = useState(0);
  const [empathy_comment, setEmpathyComment] = useState("");
  const [empathy_rating, setEmpathyRating] = useState(0);

  const [showModal, setModal] = useState(false);
  const [pendingSubmission, setPendingSubmission] = useState(false);

  const alreadySpotted = useMemo(() => {
    if (!selectedEmployee) return false;
    return Boolean(
      selectedEmployee.otos_comment || selectedEmployee.otos_rating ||
      selectedEmployee.entrepreneur_comment || selectedEmployee.entrepreneur_rating ||
      selectedEmployee.dissatisfaction_comment || selectedEmployee.dissatisfaction_rating ||
      selectedEmployee.humility_comment || selectedEmployee.humility_rating ||
      selectedEmployee.empathy_comment || selectedEmployee.empathy_rating
    );
  }, [selectedEmployee]);

  useEffect(() => {
    if (selectedEmployee) {
      setOtosComment(selectedEmployee.otos_comment || "");
      setOtosRating(Number(selectedEmployee.otos_rating) || 0);
      setEntrepreneurComment(selectedEmployee.entrepreneur_comment || "");
      setEntrepreneurRating(Number(selectedEmployee.entrepreneur_rating) || 0);
      setDissatisfactionComment(selectedEmployee.dissatisfaction_comment || "");
      setDissatisfactionRating(Number(selectedEmployee.dissatisfaction_rating) || 0);
      setHumilityComment(selectedEmployee.humility_comment || "");
      setHumilityRating(Number(selectedEmployee.humility_rating) || 0);
      setEmpathyComment(selectedEmployee.empathy_comment || "");
      setEmpathyRating(Number(selectedEmployee.empathy_rating) || 0);
    } else {
      setOtosComment(""); setOtosRating(0);
      setEntrepreneurComment(""); setEntrepreneurRating(0);
      setDissatisfactionComment(""); setDissatisfactionRating(0);
      setHumilityComment(""); setHumilityRating(0);
      setEmpathyComment(""); setEmpathyRating(0);
    }
  }, [selectedEmployee]);

  // Filtered employees based on search query
  const filteredEmployees = useMemo(() => {
    // if (!searchQuery) return [];

    return data.filter(emp => {
      return (
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.orgunit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.joblevel.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [data, searchQuery]);

  // Handle removing selected employee
  const handleRemoveEmployee = () => setSelectedEmployee(null);


  async function submitAssessment() {
    try {
      const updated = await api(`/api/spotting-form/${selectedEmployee.id}`, {
        method: "PUT",
        body: {
          otos_comment, otos_rating,
          entrepreneur_comment, entrepreneur_rating,
          dissatisfaction_comment, dissatisfaction_rating,
          humility_comment, humility_rating,
          empathy_comment, empathy_rating,
        },
      });

      // Keep the form in sync with server response
      setOtosComment(updated.otos_comment ?? "");
      setOtosRating(Number(updated.otos_rating) || 0);

      setEntrepreneurComment(updated.entrepreneur_comment ?? "");
      setEntrepreneurRating(Number(updated.entrepreneur_rating) || 0);

      setDissatisfactionComment(updated.dissatisfaction_comment ?? "");
      setDissatisfactionRating(Number(updated.dissatisfaction_rating) || 0);

      setHumilityComment(updated.humility_comment ?? "");
      setHumilityRating(Number(updated.humility_rating) || 0);

      setEmpathyComment(updated.empathy_comment ?? "");
      setEmpathyRating(Number(updated.empathy_rating) || 0);

      // (Optional) also keep card in sync so UI doesn't look stale:
      setSelectedEmployee(prev => prev ? { ...prev, ...updated } : prev);

      alert("Assessment updated successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to update assessment. Please try again!");
    } finally {
      setPendingSubmission(false);
    }
  }

  async function handleSubmit() {
    if(pendingSubmission) return;

    // Basic validation: at least one comment or one rating must be provided
    const allCommentsFilled = [
      otos_comment, entrepreneur_comment, dissatisfaction_comment, humility_comment, empathy_comment
    ].every((c) => c?.trim().length > 0);

    const allRatingsFilled = [otos_rating, entrepreneur_rating, dissatisfaction_rating, humility_rating, empathy_rating]
      .every((r) => r >= 1 && r <= 5);

    if (!allCommentsFilled || !allRatingsFilled) {
      alert("Please fill all ratings & comments before submitting!");
      return;
    }

    if (user?.role !== "BH" || !selectedEmployee) {
      alert("Incorrect role!");
      return;
    }

    // 3/5 minimum warning — if any provided rating is below 3, confirm
    const hasBelowThree = [otos_rating, entrepreneur_rating, dissatisfaction_rating, humility_rating, empathy_rating]
      .some((r) => r > 0 && r < 3);
    if (hasBelowThree) {
      setModal(true);
      return;
    }

    setPendingSubmission(true);
    await submitAssessment();
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <main className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col max-w-[960px] flex-1 gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Talent Spotting Form
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal max-w-2xl">
              Identify and document high-potential employees for future leadership roles.
            </p>
          </div>

          {!selectedEmployee && <SearchBar
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Search by employee name, ID, location, role, department, job level, etc..."
          />}

          {!selectedEmployee && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="cursor-pointer border border-transparent p-2 rounded-md"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <EmployeeCard employee={emp} openForm={true} />
                </div>
              ))}
              {filteredEmployees.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 col-span-full">
                  No employees match your search.
                </p>
              )}
            </div>
          )}

          {selectedEmployee && (
            <>
              <EmployeeCard employee={selectedEmployee} onRemove={handleRemoveEmployee} />

              <div className="grid grid-cols-1 gap-8">

                <div className="flex flex-col gap-3">
                  <CommentsTextarea
                    label="On top of Situation (OTOS)"
                    subLabel={<StarRating
                      value={otos_rating} onChange={setOtosRating} label="Allot a rating:"
                      readOnly={!(user?.role === "BH" && !selectedEmployee?.otos_rating)}
                    />}
                    placeholder="Add qualities demonstrating awareness of role, SPPBMs, market, consumer and product understanding..."
                    value={otos_comment} onChange={setOtosComment}
                    readOnly={!(user?.role === "BH" && !selectedEmployee?.otos_comment)}
                    suggestions={["Deep product insight", "Clear SPPBMs understanding", "Market-back thinking"]}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <CommentsTextarea
                    label="Entrepreneurial approach"
                    subLabel={<StarRating
                      value={entrepreneur_rating} onChange={setEntrepreneurRating} label="Allot a rating:"
                      readOnly={!(user?.role === "BH" && !selectedEmployee?.entrepreneur_rating)}
                    />}
                    placeholder="Add examples displaying initiative, resourcefulness and ownership in solving problems and driving opportunities..."
                    value={entrepreneur_comment} onChange={setEntrepreneurComment}
                    readOnly={!(user?.role === "BH" && !selectedEmployee?.entrepreneur_comment)}
                    suggestions={["Bias for action", "Resourceful problem solving", "End-to-end ownership"]}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <CommentsTextarea
                    label="Positive dissatisfaction"
                    subLabel={<StarRating
                      value={dissatisfaction_rating} onChange={setDissatisfactionRating} label="Allot a rating:"
                      readOnly={!(user?.role === "BH" && !selectedEmployee?.dissatisfaction_rating)}
                    />}
                    placeholder="Describe instances of challenging the status quo, seeking improvement and higher benchmarks..."
                    value={dissatisfaction_comment} onChange={setDissatisfactionComment}
                    readOnly={!(user?.role === "BH" && !selectedEmployee?.dissatisfaction_comment)}
                    suggestions={["Raises benchmarks", "Drives continuous improvement", "Challenges status quo constructively"]}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <CommentsTextarea
                    label="Intellectual humility"
                    subLabel={<StarRating
                      value={humility_rating} onChange={setHumilityRating} label="Allot a rating:"
                      readOnly={!(user?.role === "BH" && !selectedEmployee?.humility_rating)}
                    />}
                    placeholder="Add behavioural traits relating to learning mindset, acknowledging limitations and valuing diverse perspectives..."
                    value={humility_comment} onChange={setHumilityComment}
                    readOnly={!(user?.role === "BH" && !selectedEmployee?.humility_comment)}
                    suggestions={["Seeks feedback", "Learns from mistakes", "Credits team contributions"]}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <CommentsTextarea
                    label="Empathy"
                    subLabel={<StarRating
                      value={empathy_rating} onChange={setEmpathyRating} label="Allot a rating:"
                      readOnly={!(user?.role === "BH" && !selectedEmployee?.empathy_rating)}
                    />}
                    placeholder="Elaborate on positive demeanor like the inclination to support others in order to enable collective success..."
                    value={empathy_comment} onChange={setEmpathyComment}
                    readOnly={!(user?.role === "BH" && !selectedEmployee?.empathy_comment)}
                    suggestions={["Context-aware support", "Active listening", "Enables cross-team success"]}
                  />
                </div>
              </div>

              {user?.role === "BH" && !alreadySpotted && (<div className="sticky bottom-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  onClick={handleRemoveEmployee}
                  className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-sm font-medium px-4 py-2 transition-colors"
                >
                  Cancel
                </button>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* <button className="flex-1 sm:flex-none border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Save Draft
                  </button> */}

                  <button
                    onClick={handleSubmit}
                    disabled={pendingSubmission}
                    className={`flex-1 sm:flex-none px-8 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 ${pendingSubmission ? "bg-primary/60 cursor-not-allowed" : "bg-primary hover:bg-blue-700 text-white shadow-primary/20"}`}>
                    {pendingSubmission ? (
                      <>
                        <span className="animate-spin h-4 w-4 inline-block border-2 border-white border-t-transparent rounded-full" />
                        <span>Submitting…</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Assessment</span>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </>
                    )}
                  </button>

                </div>
              </div>)}
            </>
          )}
        </div>
      </main>
      <ConfirmationModal
        open={showModal}
        onClose={() => setModal(false)} // primary action: do NOT proceed
        onProceed={async () => {
          setModal(false);
          setPendingSubmission(true);
          await submitAssessment();
        }}
      />
    </div>
  );
}
