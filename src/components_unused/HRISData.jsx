export default function HRISData({ empData }) {
  return (
    <div className="bg-gray-50 dark:bg-[#1f2937] rounded-xl shadow-inner border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-500">database</span>
          <h3 className="text-[#111318] dark:text-white text-lg font-bold">HRIS Data</h3>
        </div>
        <span className="material-symbols-outlined text-gray-400 text-sm" title="Read Only from HR System">lock</span>
      </div>
      <div className="p-6 space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date of Joining</label>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium bg-gray-100 dark:bg-gray-800 p-2 rounded border border-transparent dark:border-gray-700">
            <span className="material-symbols-outlined text-base">calendar_month</span>
            {new Date(empData.doj).toISOString().slice(0, 10)}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Employment Type</label>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium bg-gray-100 dark:bg-gray-800 p-2 rounded border border-transparent dark:border-gray-700">
            <span className="material-symbols-outlined text-base">badge</span>
            {empData.employmenttype}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Compensation Band</label>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium bg-gray-100 dark:bg-gray-800 p-2 rounded border border-transparent dark:border-gray-700">
            <span className="material-symbols-outlined text-base">payments</span>
            {empData.currentcompensationband}
          </div>
        </div>
      </div>
    </div>
  );
};