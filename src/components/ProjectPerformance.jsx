export default function ProjectPerformance({ empData }) {
  return (
    <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex items-center gap-2 bg-gray-50/50 dark:bg-gray-800/50">
        <span className="material-symbols-outlined text-primary">rocket_launch</span>
        <h3 className="text-[#111318] dark:text-white text-lg font-bold">Project Performance</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#111318] dark:text-gray-200">Recent Project Rating (Project Alpha)</label>
          <div className="flex items-center gap-3">
          <input className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" max="5" min="1" step="0.5" type="range" value={empData.recentprojectrating} readOnly />
          <span className="text-sm font-bold bg-primary/10 text-primary px-2 py-1 rounded">{empData.recentprojectrating}</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#111318] dark:text-gray-200">Delivery Speed</label>
          <div className="flex items-center gap-3">
          <input className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" max="5" min="1" step="0.5" type="range" value={empData.deliveryspeed} readOnly />
          <span className="text-sm font-bold bg-primary/10 text-primary px-2 py-1 rounded">{empData.deliveryspeed}</span>
          </div>
        </div>
      </div>
    </div>
  );
};