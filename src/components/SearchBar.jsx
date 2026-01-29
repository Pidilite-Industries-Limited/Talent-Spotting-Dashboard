export default function SearchBar({ value, placeholder, onChange }) {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary">
      <label className="relative flex items-center w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
          <span className="material-symbols-outlined">search</span>
        </div>
        <input
          className="w-full bg-transparent border-none py-2.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl text-base focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
