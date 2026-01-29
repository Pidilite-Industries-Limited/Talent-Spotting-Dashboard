import { useNavigate } from "react-router-dom"

export default function DataTable({ data }) {
  const navigate = useNavigate();
  return (
  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col flex-1">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
            <th className="p-4">Employee</th>
            <th className="p-4">Department / Role</th>
            <th className="p-4 text-center">Assessment</th>
            <th className="p-4">Project Score</th>
            <th className="p-4 text-center">Perf. Rating</th>
            <th className="p-4 text-center">OAAP Score</th>
            <th className="p-4 text-center">Key Talent</th>
            {/* <th className="p-4 text-right">Actions</th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {data.map(emp => (
            <tr key={emp.id} onClick={() => navigate(`/talent-spotting/talent-profile/employee/${emp.id}`)} className="group hover:bg-blue-100 dark:hover:bg-slate-600/50 transition-colors cursor-pointer">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center" style={{ backgroundImage: `url(${emp.avatar})` }}></div>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{emp.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">ID: {emp.id}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{emp.department}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{emp.role}</p>
                </div>
              </td>
              <td className="p-4 text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${emp.assessment === 'Done' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                  {emp.assessment}
                </span>
              </td>
              <td className="p-4">
                <div className="w-full max-w-[140px]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{emp.projectscore}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${emp.projectscore}%` }}></div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-center">
                <div className={`flex items-center justify-center gap-1 ${emp.assessment === 'Pending' ? 'text-slate-300 dark:text-slate-600' : 'text-amber-400'}`}>
                  <span className={`text-sm font-bold mr-1 ${emp.assessment === 'Pending' ? 'text-slate-700 dark:text-slate-200' : 'text-slate-700 dark:text-slate-200'}`}>
                    {emp.perfrating}
                  </span>
                  <span className="material-symbols-outlined text-[18px] filled">star</span>
                </div>
              </td>
              <td className="p-4 text-center">
                <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm">{emp.oaapscore}</span>
              </td>
              <td className="p-4 text-center">
                <button
                  className={`
                    transition-transform 
                    ${!emp.key ? 'text-slate-300 cursor-default hover:none' : 'text-primary hover:scale-110'}
                    ${emp.assessment === 'Pending' ? 'text-slate-300 cursor-default hover:none' : ''}
                  `}
                  disabled={emp.assessment === 'Pending' || !emp.key}
                  aria-label={emp.key ? 'Key Talent Flag' : 'Not Key Talent'}
                >
                  <span className="material-symbols-outlined filled">flag</span>
                </button>
              </td>

              {/* <td className="p-4 text-right">
                <button className="text-slate-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}