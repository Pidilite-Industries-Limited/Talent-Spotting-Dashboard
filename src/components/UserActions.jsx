export default function UserActions() {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          title="Notifications"
          className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">
            notifications
          </span>
        </button>
  
        <button
          type="button"
          title="Help"
          className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">
            help
          </span>
        </button>
  
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-600" />
  
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[20px]">
              person
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-medium text-slate-900 dark:text-slate-100">
              Business Head
            </p>
            <p className="text-[10px] text-slate-400">
              Team
            </p>
          </div>
        </div>
      </div>
    );
  }