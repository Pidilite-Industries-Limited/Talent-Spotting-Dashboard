export default function TalentStatTile({ title, value, change, changeType, icon }) {
    const colors = {
      up: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400",
      down: "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400",
      warning: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400",
    };

    return (
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          </div>
          {change && (
          <div className="mt-2 flex items-center gap-1 font-medium">
              <span className={`material-symbols-outlined text-sm ${colors[changeType]}`}>{icon}</span>
              <span className={`${colors[changeType]} text-sm`}>{change}</span>
          </div>
          )}
          <div className="absolute right-0 top-0 h-full w-1 bg-primary"></div>
        </div>
    )
}