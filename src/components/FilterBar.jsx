import SearchBar from "./SearchBar";

export default function FilterBar({
  searchTerm,
  onSearchChange,
  department,
  onDepartmentChange,
  role,
  onRoleChange,
  jobLevel,
  onJobLevelChange,
  keyTalent,
  onKeyTalentChange,
  departments, roles, joblevels, keytalentoptions
}) {
  return (
    /* 1. Removed sticky, blur, and fixed flex-row. Used a simple clean container. */
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-6">

      {/* 2. Search bar now occupies its own full row */}
      <div className="w-full">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search by employee name, ID, role, department, divison, job level, etc..."
        />
      </div>

      {/* 3. Filters moved to a dedicated grid below. Easy to add more items here. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {departments &&
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Department</label>
            <div className="relative">
              <select
                value={department}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className="appearance-none w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2.5 px-4 pr-10 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
              >
                <option>All Departments</option>
                {departments.map((div) => (
                  <option key={div}>{div}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>
        }

        {roles &&
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Role</label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => onRoleChange(e.target.value)}
                className="appearance-none w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2.5 px-4 pr-10 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
              >
                <option>All Roles</option>
                {roles.map((fn) => (
                  <option key={fn}>{fn}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>
        }

        {joblevels &&
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Level</label>
            <div className="relative">
              <select
                value={jobLevel}
                onChange={(e) => onJobLevelChange(e.target.value)}
                className="appearance-none w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2.5 px-4 pr-10 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
              >
                <option>All Job Levels</option>
                {joblevels.map((jl) => (
                  <option key={jl}>{jl}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>
        }

        {/* Toggle aligned to the bottom to match select heights */}
        {/* <div className="flex items-center h-[42px]">
          <label className="flex items-center cursor-pointer gap-3 select-none">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={keyTalentOnly}
                onChange={(e) => onKeyTalentToggle(e.target.checked)}
              />
              <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Key Talent Only</span>
          </label>
        </div> */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 ml-1">Key Talent</label>
            <div className="relative">
              <select
                value={keyTalent}
                onChange={(e) => onKeyTalentChange(e.target.value)}
                className="appearance-none w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2.5 px-4 pr-10 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
              >
                {keytalentoptions.map((kt) => (
                  <option key={kt}>{kt}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
