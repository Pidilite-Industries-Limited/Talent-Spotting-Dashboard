export default function CandidateStatCard({ title, value, change, changeType, icon }) {
  const colors = {
    up: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400",
    down: "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400",
    warning: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <div className="flex flex-col gap-2 p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        {change && (
          <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${colors[changeType]}`}>
            <span className="material-symbols-outlined text-[14px] mr-1">{icon}</span>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}