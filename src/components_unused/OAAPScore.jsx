export default function OAAPScore({ empData }) {
  return (
    <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex items-center gap-2 bg-gray-50/50 dark:bg-gray-800/50">
        <span className="material-symbols-outlined text-primary">psychology</span>
        <h3 className="text-[#111318] dark:text-white text-lg font-bold">OAAP Score</h3>
      </div>
      <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
        <div className="relative size-32 shrink-0">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
            <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
            <path className="text-primary drop-shadow-md" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="3"></path>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-2xl font-bold text-[#111318] dark:text-white">{empData.oaapscore}</span>
            <span className="text-[10px] text-gray-500 block uppercase">Score</span>
          </div>
        </div>
        <div className="flex-1 space-y-4 w-full">
          <label className="text-sm font-medium text-[#111318] dark:text-gray-200">Adjust OAAP Score (AI Recommended: 8.2)</label>
          <div className="flex gap-2">
            <input className="w-24 h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111318] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" step="0.1" type="number" value={empData.adjustedoaapscore} readOnly />
            <button className="px-4 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Recalculate</button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">"Demonstrates high potential for cross-functional roles based on recent certification in Project Management."</p>
        </div>
      </div>
    </div>
  );
};