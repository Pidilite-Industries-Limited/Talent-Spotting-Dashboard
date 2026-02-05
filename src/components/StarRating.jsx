export default function StarRating({ value = 0, label, onChange, readOnly = false }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
      <div className="flex">
        {stars.map((s) => {
          const filled = s <= value;
          const base = filled ? "text-yellow-400 dark:text-white" : "text-slate-300 dark:text-slate-600";
          return (
            <button
              key={s}
              type="button"
              className={`transition-all ${base} ${readOnly ? "cursor-default" : "hover:scale-105"}`}
              onClick={() => !readOnly && onChange?.(s)}
              aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
            >
              <span
                className={`material-symbols-outlined block text-2xl 
                ${filled ? "text-amber-400 [font-variation-settings:'FILL'_1]" : 
                  "text-slate-300 dark:text-slate-600 [font-variation-settings:'FILL'_0]"}`}
              >
                star
              </span>
            </button>
          );
        })}
      </div>
      <span className="ml-1 text-slate-500 dark:text-slate-400">({value || 0}/5)</span>
    </div>
  );
}