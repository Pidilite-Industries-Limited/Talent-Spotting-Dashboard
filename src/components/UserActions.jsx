import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../utilities/AuthProvider.jsx";

const roleNames = {
  "BH": "Business Head",
  "HR" : "Human Resources"
}

export default function UserActions() {
  const { logout, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {  
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }
  
  if (loading) return <div>Loading...</div>;
  
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
              {roleNames[user.role]}
            </p>
            <p className="text-[10px] text-slate-400">
              {user.department}
            </p>
          </div>
        </div>
  
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-600" />

        <button data-href="/logout" onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg bg-red-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors">
          Logout
        </button>
      </div>
    );
  }