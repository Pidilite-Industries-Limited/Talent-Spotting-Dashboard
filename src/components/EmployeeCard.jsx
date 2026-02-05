const TAG_STYLE_MAP = {
  yellow: {
    container: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-400",
  },
};

export default function EmployeeCard({ employee, onRemove, openForm = false }) {
  return (
    <div className={`bg-white ${openForm ? "hover:bg-blue-100" : ""} dark:bg-surface-dark dark:hover:bg-gray-600/100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 overflow-hidden`}>

      <div className="relative px-6 py-2 border-b border-primary/10 flex justify-between items-center">
        <div className="py-4 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="relative group">
            {/* <div
              className="w-20 h-20 md:w-24 md:h-24 bg-center bg-no-repeat bg-cover rounded-full border-4 border-white dark:border-surface-dark shadow-md"
              style={{ backgroundImage: `url(${employee.avatar})` }}
              title={`Portrait of ${employee.name}, ${employee.role}`}
            /> */}
            {/* <div
            className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white dark:border-surface-dark`}
            style={{ backgroundColor: employee.isActive ? "#22c55e" : "#ccc" }}
            title={employee.isActive ? "Active" : "Inactive"}
          /> */}
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold">{employee.name}</h3>
              {employee.tags?.map((tag, idx) => {
                return (
                  <span key={idx} className={`${TAG_STYLE_MAP[tag.color].container} ${TAG_STYLE_MAP[tag.color].text} text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1`}>
                    <span className="material-symbols-outlined text-[14px]">
                      {tag.icon}
                    </span>
                    {tag.label}
                  </span>
                );
              })}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">{employee.role} | {employee.department}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">badge</span>{employee.id}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">event</span>{(new Date(employee.doj)).toLocaleDateString('en-GB').replace(/\//g, '-')}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span>{employee.location}</span>
            </div>
          </div>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-4 right-4 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span> Cancel
          </button>
        )}

        {/* <div className="w-full md:w-auto mt-4 md:mt-0">
          <button className="w-full md:w-auto border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Full Profile
          </button>
        </div> */}
      </div>
    </div>
  );
}
