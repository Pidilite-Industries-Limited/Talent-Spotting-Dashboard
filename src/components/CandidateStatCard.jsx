export default function CandidateStatCard({ title, value, changeType, icon }) {
  const colors = {
    positive: "text-emerald-600 dark:text-emerald-400",
    negative: "text-red-600 dark:text-red-400",
    warning: "text-orange-600 dark:text-orange-400",
    star: "text-yellow-600 dark:text-yellow-400",
    key: "text-blue-600 dark:text-blue-400",
    score: "text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="flex flex-col gap-2 p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
          <span className={`material-symbols-outlined text-[14px] mr-1 rounded-full ${colors[changeType]}`}>
            {icon}
          </span>
      </div>
    </div>
  );
}