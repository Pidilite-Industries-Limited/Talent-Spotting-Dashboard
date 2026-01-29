import { useState, useMemo, useContext } from 'react';
import SideBar from '../../components/SideBar';
import TalentStatTile from '../../components/TalentStatTile';
import FilterBar from '../../components/FilterBar';
import EmployeeTile from '../../components/EmployeeTile';
import { DataContext } from '../../utilities/DataProvider';

export default function KeyTalentDashboard() {
    const { data, loading, error } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [divisionFilter, setDivisionFilter] = useState("All Divisions");
    const [roleFilter, setRoleFilter] = useState("All Roles");
    const [jobLevelFilter, setJobLevelFilter] = useState("All Job Levels");
    const [keyTalentOnly, setKeyTalentOnly] = useState(false);

    const divisions = useMemo(() => {
      return Array.from(new Set(data.map(emp => emp.department))).sort();
    }, [data]);
    const roles = useMemo(() => {
      return Array.from(new Set(data.map(emp => emp.role))).sort();
    }, [data]);
    const jobLevels = useMemo(() => {
      return Array.from(new Set(data.map(emp => emp.joblevel))).sort();
    }, [data]);

    const filteredData = useMemo(() => {
      return data.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDivision = divisionFilter === "All Divisions" || emp.department === divisionFilter;
        const matchesRole = roleFilter === "All Roles" || emp.role === roleFilter;
        const matchesJobLevel = jobLevelFilter === "All Job Levels" || emp.joblevel == jobLevelFilter;
        const matchesKeyTalent = !keyTalentOnly || emp.key;
        return matchesSearch && matchesDivision && matchesRole && matchesJobLevel && matchesKeyTalent;
      });
    }, [data, searchTerm, divisionFilter, roleFilter, jobLevelFilter, keyTalentOnly]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative flex h-screen w-full">
      <SideBar />
      <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
        <div className="container flex flex-col mx-auto max-w-7xl p-6 lg:p-10 gap-6">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                Key Talent Overview
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal max-w-2xl">
                Manage and track high-potential employees identified across the organization.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">file_download</span>
                Export Report
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Nominate Talent
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TalentStatTile title="Total Key Talents" value={data.filter(emp => emp.key).length.toString()} change="+12% vs last Q" changeType="up" icon="trending_up" />
            <TalentStatTile title="High Potential" value="96" change="Updated this month" changeType="warning" icon="info" />
            <TalentStatTile title="Ready Now" value="58" change="Updated this month" changeType="warning" icon="info" />
            <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tag Distribution</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden flex">
                <div className="h-2 bg-emerald-400" style={{ width: "45%" }}></div>
                <div className="h-2 bg-purple-400" style={{ width: "37%" }}></div>
                <div className="h-2 bg-amber-400" style={{ width: "18%" }}></div>
              </div>
              <div className="mt-3 flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span> Top Performer
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-400"></span> Future Leader
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-400"></span> Flight Risk
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1 bg-primary"></div>
            </div>
          </div>

          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={(val) => { setSearchTerm(val); handleFilterChange(); }}
            division={divisionFilter}
            onDivisionChange={(val) => { setDivisionFilter(val); handleFilterChange(); }}
            roleFilter={roleFilter}
            onRoleChange={(val) => { setRoleFilter(val); handleFilterChange(); }}
            jobLevelFilter={jobLevelFilter}
            onJobLevelChange={(val) => { setJobLevelFilter(val); handleFilterChange(); }}
            keyTalentOnly={keyTalentOnly}
            onKeyTalentToggle={(val) => { setKeyTalentOnly(val); handleFilterChange(); }}
            divisions={divisions} roles={roles} joblevels={jobLevels}
          />

          {/* Employee List */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData.length > 0 ? (
              filteredData.map((emp) => <EmployeeTile emp={emp} key={emp.id} />)
            ) : (
              <p className="col-span-full text-slate-500 dark:text-slate-400">No employees match your search.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
