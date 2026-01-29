export default function AssessmentResults({ empData }) {
  return (
    <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">fact_check</span>
          <h3 className="text-[#111318] dark:text-white text-lg font-bold">Assessment Results</h3>
        </div>
        <span className="text-xs font-medium text-gray-500 bg-white dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600">Last updated: 2 days ago</span>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#111318] dark:text-gray-200">Technical Assessment Score</label>
          <input className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111318] dark:text-white" max="100" min="0" type="number" value={empData.technicalassessmentscore} readOnly />
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${empData.technicalassessmentscore}%` }}></div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#111318] dark:text-gray-200">Cognitive Aptitude Score</label>
          <input className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111318] dark:text-white" max="100" min="0" type="number" value={empData.cognitiveaptitudescore} readOnly />
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
            <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${empData.cognitiveaptitudescore}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}