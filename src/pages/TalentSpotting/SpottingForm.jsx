import { useState, useMemo, useContext } from "react";
import SearchBar from "../../components/SearchBar";
import EmployeeCard from "../../components/EmployeeCard";
import AITextarea from "../../components/AITextarea";
import { DataContext } from '../../utilities/DataProvider';

export default function SpottingForm() {
  const { data, loading, error } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Filtered employees based on search query
  const filteredEmployees = useMemo(() => {
    // if (!searchQuery) return [];
  
    const query = searchQuery.toLowerCase();
  
    return data.filter(emp => {
      const name = emp.name || "";
      const id = emp.id || "";
      const department = emp.department || "";
      const position = emp.position || "";
      const role = emp.role || "";
  
      return (
        name.toLowerCase().includes(query) ||
        id.toLowerCase().includes(query) ||
        department.toLowerCase().includes(query) ||
        position.toLowerCase().includes(query) ||
        role.toLowerCase().includes(query)
      );
    });
  }, [data, searchQuery]);  

  // Handle removing selected employee
  const handleRemoveEmployee = () => setSelectedEmployee(null);
  
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

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Search by name, ID, department, or role..."
          />

          {/* Employee List View */}
          {!selectedEmployee && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="cursor-pointer border border-transparent hover:border-primary p-2 rounded-md"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <EmployeeCard employee={emp} hideHeader={true} />
                </div>
              ))}
              {filteredEmployees.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 col-span-full">
                  No employees match your search.
                </p>
              )}
            </div>
          )}

          {/* Selected Employee Form */}
          {selectedEmployee && (
            <>
              <EmployeeCard
                employee={selectedEmployee}
                onRemove={handleRemoveEmployee}
              />

              <div className="grid grid-cols-1 gap-8">
                <AITextarea
                  label="Key Positive Traits"
                  subLabel="What makes them stand out?"
                  placeholder="Describe specific instances of leadership, innovation, or exceptional performance..."
                  suggestions={["Strategic Vision", "Cross-functional Leadership", "Adaptability"]}
                />

                <AITextarea
                  label="Development Areas"
                  subLabel="Where do they need support?"
                  placeholder="Identify specific skills or experiences needed for the next role..."
                  suggestions={["Stakeholder Management", "Delegation"]}
                />
              </div>

              <div className="sticky bottom-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  onClick={handleRemoveEmployee}
                  className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-sm font-medium px-4 py-2 transition-colors"
                >
                  Cancel
                </button>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Save Draft
                  </button>
                  <button className="flex-1 sm:flex-none bg-primary hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-colors flex items-center justify-center gap-2">
                    <span>Submit Assessment</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
