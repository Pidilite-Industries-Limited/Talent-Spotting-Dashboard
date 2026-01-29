import { useLocation, Link } from "react-router-dom";

function NavItem({ to, label, subtitle, icon, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
      ${isActive ? "bg-primary/20 text-primary dark:text-sky-500 bg-sky-100 dark:bg-slate-700" : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`}>
      {icon && <span className="material-symbols-outlined text-[20px]">{icon}</span>}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</span>
        {subtitle && <span className="text-xs text-slate-400">{subtitle}</span>}
      </div>
    </Link>
  );
}

function NavGroup({ group, activeGroup, activeTab }) {
  const isActiveGroup = group.url === activeGroup;

  return (
    <div className="relative group">
      <button
        type="button"
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors 
          ${isActiveGroup ? "bg-primary/20 text-primary dark:text-sky-500 bg-sky-100 dark:bg-slate-700" : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`}>
        {group.icon && <span className="material-symbols-outlined text-[20px]">{group.icon}</span>}
        {group.label}
        <span className="material-symbols-outlined text-[16px]">expand_more</span>
      </button>
      <div className="absolute left-0 mt-1 w-64 bg-white dark:bg-black rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {group.tabs.map((tab) => {
            const isActiveTab = isActiveGroup && tab.url === activeTab;
            return (
              <NavItem
                key={tab.url}
                to={`/${group.url}/${tab.url}`}
                label={tab.label}
                subtitle={tab.subtitle}
                icon={tab.icon}
                isActive={isActiveTab}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function NavBar({ navStructure }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const activeGroup = pathnames[0];
  const activeTab = pathnames[1];

  return (
    <div className="flex items-center gap-6">
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img
          src="https://assets.pidilite.com/is/image/pidilite/pidilite-logo-1/"
          alt="Pidilite Logo"
          className="h-10 w-auto"
        />
        <div className="flex flex-col">
          <h1 className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">Pidilite Talent Hub</h1>
          <p className="text-slate-400 text-xs">Integrated Talent Management</p>
        </div>
      </Link>

      <nav className="flex items-center gap-3">
        {navStructure.map((group) => (
          <NavGroup
            key={group.url}
            group={group}
            activeGroup={activeGroup}
            activeTab={activeTab}
          />
        ))}
      </nav>
    </div>
  );
}
