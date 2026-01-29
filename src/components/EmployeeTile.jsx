export default function EmployeeTile({ emp }) {
    const tagColors = {
      "Top Performer": "bg-blue-50 text-blue-700",
      "Specialist": "bg-green-50 text-green-700",
      "Flight Risk": "bg-amber-50 text-amber-700",
      "Future Leader": "bg-purple-50 text-purple-700",
    };
    const tagColorClass = tagColors[emp.tag] || '';

    let readinessColorClass = 'bg-yellow-400';
    if (emp.readinesspct > 50) {
      readinessColorClass = 'bg-sky-400';
    }
    if (emp.readinesspct === 100) {
      readinessColorClass = 'bg-blue-500';
    }
  
    return (
      <div className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
          {/* {emp.key && (
          <div className="absolute left-4 top-4 flex items-center justify-center rounded-full bg-primary p-1 text-white">
            <span className="material-symbols-outlined text-[16px]">key</span>
          </div>
          )}
          <div className="absolute right-4 top-4">
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${tagColorClass}`}>
              {emp.tag}
            </span>
          </div> */}
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-slate-50 dark:border-slate-700 bg-cover bg-center" style={{ backgroundImage: `url(${emp.avatar})` }}></div>
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{emp.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{emp.role}</p>
            <p className="mt-1 text-xs font-medium text-primary">{emp.orgUnit}</p>
            <p className="mt-1 text-xs text-slate-900 dark:text-slate-400">{emp.division}</p>
          </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Potential</span>
            <span className={`font-semibold ${emp.potential === "High" ? "text-emerald-600 dark:text-emerald-400" : ""}`}>{emp.potential}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Readiness</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{emp.readiness}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className={`h-2 rounded-full ${readinessColorClass}`}
                style={{ width: `${emp.readinesspct}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-2 border-t border-slate-100 pt-4 dark:border-slate-700">
          <a href={`/talent-spotting/talent-profile/employee/${emp.id}`} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/90 py-1.5 text-sm font-medium text-white hover:bg-primary dark:bg-blue-600 dark:hover:bg-blue-500 mb-2">
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            View Profile
          </a>
          <a href="#" className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
            <span className="material-symbols-outlined text-[18px]">edit_square</span>
            Edit Details
          </a>
        </div>
      </div>
    );
  }
  