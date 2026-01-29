import React from "react";
import { Link, NavLink } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: "dashboard", path: "/talent-spotting/talent-dashboard" },
  // { title: "Talent Pool", icon: "people", path: "/talent-spotting/key-talent-dashboard" },
  { title: "Reports", icon: "bar_chart", path: "/" },
  { title: "Settings", icon: "settings", path: "/" },
];

export default function SideBar() {
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full p-4">
      <div className="mb-8 flex items-center justify-center text-2xl font-bold text-primary dark:text-white">
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img
          src="https://assets.pidilite.com/is/image/pidilite/pidilite-logo-1/"
          alt="Pidilite Logo"
          className="h-10 w-auto"
        />
        <div className="flex flex-col">
          <h1 className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">Pidilite TMS</h1>
          <p className="text-slate-400 text-xs">AI-Ready System</p>
        </div>
      </Link>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg text-sm font-medium hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                    isActive
                      ? "bg-primary/20 dark:bg-primary/30 text-primary dark:text-white"
                      : "text-slate-700 dark:text-slate-300"
                  }`
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}