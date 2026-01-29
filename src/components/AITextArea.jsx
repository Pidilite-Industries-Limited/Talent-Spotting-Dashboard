export default function AITextarea({ label, subLabel, placeholder, suggestions }) {
    return (
      <div className="flex flex-col gap-3">
        <label className="flex justify-between items-end">
          <span className="text-slate-900 dark:text-white text-base font-semibold">{label}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{subLabel}</span>
        </label>
        <div className="relative">
          <textarea
            className="w-full min-h-[160px] rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent p-4 text-base resize-y transition-shadow"
            placeholder={placeholder}
          />
          <div className="absolute bottom-3 right-3 text-slate-400 hover:text-primary cursor-pointer" title="Use AI to refine text">
            <span className="material-symbols-outlined">auto_fix_high</span>
          </div>
        </div>
  
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">psychology</span> Suggestions:
          </span>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              className="bg-slate-100 dark:bg-slate-700 hover:bg-primary/10 hover:text-primary dark:hover:text-primary text-slate-600 dark:text-slate-300 text-xs px-3 py-1.5 rounded-full transition-colors font-medium border border-transparent hover:border-primary/20"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    );
  }
  