export default function ProfileHeader({ emp, currentIndex, total, hasPrev, hasNext, onPrev, onNext}) {
  return (
    <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-gray-800 p-6">
      <div className="flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center">

        <div className="flex gap-5 w-full lg:w-auto">
          <div className="relative shrink-0">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-xl h-24 w-24 shadow-inner"
              style={{ backgroundImage: `url(${emp.avatar})` }}
            />
          <div
            className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 w-8 h-8 rounded-full border-2 border-white dark:border-[#1a202c] flex justify-center items-center"
            title="Active Employee"
          >
            <span className="material-symbols-outlined block">check</span>
          </div>
        </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[#111318] dark:text-white text-2xl font-bold leading-tight">
                {emp.name}
              </h1>
              <span className="bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 px-2 py-0.5 rounded text-xs font-semibold border border-blue-100 dark:border-blue-800">
                ID: {emp.id}
              </span>
            </div>

            <p className="text-[#616f89] dark:text-gray-400 text-base font-normal mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">work</span> {emp.role}
              <span className="mx-1">•</span>
              <span className="material-symbols-outlined text-lg">apartment</span> {emp.department}
            </p>

            <p className="text-[#616f89] dark:text-gray-400 text-sm mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">location_on</span> {emp.location}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/50">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-green-700 dark:text-green-400 font-medium uppercase tracking-wider">
                Key Talent Status
              </span>
              <span className="text-sm font-bold text-green-800 dark:text-green-300">
                Potential Leader
              </span>
            </div>
          </div>

          <div className="flex bg-[#f0f2f4] dark:bg-gray-800 rounded-lg p-1 gap-1">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="h-9 px-3 rounded-md disabled:opacity-40 hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all text-[#111318] dark:text-white"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <div className="h-9 flex items-center justify-center px-2 text-xs font-medium text-gray-500">
              Record {currentIndex} of {total}
            </div>

            <button
              onClick={onNext}
              disabled={!hasNext}
              className="h-9 px-3 rounded-md disabled:opacity-40 hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all text-[#111318] dark:text-white"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
