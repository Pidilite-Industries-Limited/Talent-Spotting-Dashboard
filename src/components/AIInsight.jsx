export default function AIInsight({ empData }) {
    return (
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
          <span className="material-symbols-outlined text-lg">auto_awesome</span>
          AI Talent Insight
        </div>
        <p className="text-xs leading-relaxed text-indigo-900 dark:text-indigo-200">
          {empData.aiInsight}
        </p>
      </div>
    );
  }
  