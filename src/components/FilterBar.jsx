import SearchBar from "./SearchBar";

export default function FilterBar({
  searchTerm,
  onSearchChange,
  division,
  onDivisionChange,
  roleFilter,
  onRoleChange,
  jobLevel,
  onJobLevelChange,
  keyTalentOnly,
  onKeyTalentToggle,
  divisions, roles, joblevels
}) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur bg-white/80 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
      
      <div className="flex-1 w-full">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search by employee name or ID..."
        />
      </div>

      <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
        {divisions && 
        <div className="relative min-w-[140px]">
          <select
            value={division}
            onChange={(e) => onDivisionChange(e.target.value)}
            className="appearance-none w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 py-2.5 px-4 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
          >
            <option>All Divisions</option>
            {divisions.map((div) => (
              <option key={div}>{div}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </div>
        </div>
        }
        {roles && 
        <div className="relative min-w-[140px]">
          <select
            value={roleFilter}
            onChange={(e) => onRoleChange(e.target.value)}
            className="appearance-none w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 py-2.5 px-4 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
          >
            <option>All Roles</option>
            {roles.map((fn) => (
              <option key={fn}>{fn}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </div>
        </div>
        }
        {joblevels && 
        <div className="relative min-w-[140px]">
          <select
            value={jobLevel}
            onChange={(e) => onJobLevelChange(e.target.value)}
            className="appearance-none w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 py-2.5 px-4 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
          >
            <option>All Job Levels</option>
            {joblevels.map((jl) => (
              <option key={jl}>{jl}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </div>
        </div>
        }
        <label className="flex items-center cursor-pointer gap-2 select-none border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-slate-50 dark:bg-slate-700">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={keyTalentOnly}
              onChange={(e) => onKeyTalentToggle(e.target.checked)}
            />
            <div className="w-9 h-5 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Key Talent Only</span>
        </label>
      </div>
    </div>
  );
}
