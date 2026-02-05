import { useState, useMemo, useContext } from 'react';
import SideBar from '../../components/SideBar';
import CandidateStatCard from '../../components/CandidateStatCard';
import FilterBar from '../../components/FilterBar';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import { DataContext } from '../../utilities/DataProvider';

export default function TalentDashboard() {
  const { data, loading, error } = useContext(DataContext);

  const PAGE_SIZE = 4;

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [jobLevelFilter, setJobLevelFilter] = useState("All Job Levels");
  // const [keyTalentOnly, setKeyTalentOnly] = useState(false);
  const [keyTalentFilter, setKeyTalentFilter] = useState("All Employees");

  const [currentPage, setCurrentPage] = useState(1);
  const handleFilterChange = () => setCurrentPage(1);

  const departments = useMemo(() => {
    return Array.from(new Set(data.map(emp => emp.department))).sort();
  }, [data]);
  const roles = useMemo(() => {
    return Array.from(new Set(data.map(emp => emp.role))).sort();
  }, [data]);
  const joblevels = useMemo(() => {
    return Array.from(new Set(data.map(emp => emp.joblevel))).sort();
  }, [data]);
  const keyTalentOptions = ["All Employees", "All Key Talents", "Junior Key Talents", "Senior Key Talents"];

  const filteredData = useMemo(() => {
    return data.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.orgunit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.joblevel.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === "All Departments" || emp.department === departmentFilter;
      const matchesRole = roleFilter === "All Roles" || emp.role === roleFilter;
      const matchesJobLevel = jobLevelFilter === "All Job Levels" || emp.joblevel === jobLevelFilter;
      // const matchesKeyTalent = !keyTalentOnly || emp.key;
      const matchesKeyTalent = (() => {
        if (keyTalentFilter === "All Employees") return true;
        if (!emp.key) return false;
        if (keyTalentFilter === "All Key Talents") return true;
        if (emp.joblevel && emp.joblevel.length > 4) {
            const levelChar = emp.joblevel.charAt(4);
            if (keyTalentFilter === "Junior Key Talents") return ['4', '5', '6', '7'].includes(levelChar);
            if (keyTalentFilter === "Senior Key Talents") return ['8', '9'].includes(levelChar);
        }
        return false;
      })();
      
      return matchesSearch && matchesDepartment && matchesRole && matchesJobLevel && matchesKeyTalent;
    });
  // }, [data, searchTerm, departmentFilter, roleFilter, jobLevelFilter, keyTalentOnly]);
  }, [data, searchTerm, departmentFilter, roleFilter, jobLevelFilter, keyTalentFilter]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <SideBar />
      <main className="flex-1 h-full overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-8 flex flex-col gap-6">

        <div className="flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
          <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Home</a>
          <span>/</span>
          <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Talent Management</a>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">Talent Dashboard</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Talent Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 text-base">Manage and evaluate potential high-value candidates across the organization.</p>
          </div>
          {/* <button className="flex items-center gap-2 h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            <span>Export Report</span>
          </button> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
          <CandidateStatCard title="Total Candidate Count" value={data.length.toString()} changeType="positive" icon="group"/>
          <CandidateStatCard title="Key Candidates Count" value={data.filter(emp => emp.key).length.toString()} changeType="key" icon="flag"/>
          <CandidateStatCard title="Pending Assessments" value={data.filter(emp => emp.assessment === 'Pending').length.toString()} changeType="warning" icon="warning"/>
          {/* <CandidateStatCard title="Avg. Perf. Rating" value={(data.reduce((sum, emp) => sum + (parseFloat(emp.perfrating) || 0), 0)/data.length).toFixed(2).toString()} changeType="star" icon="star"/>
          <CandidateStatCard title="Avg. OAAP Score" value={(data.reduce((sum, emp) => sum + (emp.oaapscore || 0), 0)/data.length).toFixed(2).toString()} changeType="score" icon="leaderboard"/> */}
        </div>

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={(val) => { setSearchTerm(val); handleFilterChange(); }}
          department={departmentFilter}
          onDepartmentChange={(val) => { setDepartmentFilter(val); handleFilterChange(); }}
          role={roleFilter}
          onRoleChange={(val) => { setRoleFilter(val); handleFilterChange(); }}
          jobLevel={jobLevelFilter}
          onJobLevelChange={(val) => { setJobLevelFilter(val); handleFilterChange(); }}
          // keyTalentOnly={keyTalentOnly}
          // onKeyTalentToggle={(val) => { setKeyTalentOnly(val); handleFilterChange(); }}
          keyTalent={keyTalentFilter}
          onKeyTalentChange={(val) => { setKeyTalentFilter(val); handleFilterChange(); }}
          departments={departments} roles={roles} joblevels={joblevels} keytalentoptions={keyTalentOptions}
        />

        <DataTable data={paginatedData} />

        <div className="mt-4 flex justify-center">
          <Pagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage}/>
        </div>

      </main>
    </div>
  );
};
