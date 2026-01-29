export default function PastRatings({ empData }) {
  return (
    <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex items-center gap-2">
        <span className="material-symbols-outlined text-gray-500">history</span>
        <h3 className="text-[#111318] dark:text-white text-lg font-bold">Past Ratings</h3>
      </div>
      <div className="p-6">
        {empData.pastRatings.map((rating, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-12 text-sm font-bold text-gray-500">{rating.year}</div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">{rating.performance}</span>
                <span className="text-xs font-bold text-[#111318] dark:text-white">{rating.score}/5</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(rating.score / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
