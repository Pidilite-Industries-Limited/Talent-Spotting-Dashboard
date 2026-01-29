import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../utilities/DataProvider';
import ProfileHeader from '../../components/ProfileHeader';
import AssessmentResults from '../../components/AssessmentResults';
import ProjectPerformance from '../../components/ProjectPerformance';
import OAAPScore from '../../components/OAAPScore';
import HRISData from '../../components/HRISData';
import AIInsight from '../../components/AIInsight';

export default function TalentProfile() {
  const { empId } = useParams();
  const navigate = useNavigate();
  const { data: employees, loading } = useContext(DataContext);

  const [empData, setEmpData] = useState(null);

  useEffect(() => {
    if (!empId && employees && employees.length > 0) {
      navigate(`/talent-spotting/talent-profile/employee/${employees[0].id}`);
    }
  }, [empId, employees, navigate]);

  useEffect(() => {
    if (!employees || !empId) return;

    const found = employees.find(e => e.id === empId);
    setEmpData(found || null);
  }, [employees, empId]);

  if (loading || !empData) return <div>Loading...</div>;

  const currentIndex = employees.findIndex(e => e.id === empId);
  const total = employees.length;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < total - 1;

  const goPrev = () => {
    if (!hasPrev) return;
    navigate(`/talent-spotting/talent-profile/employee/${employees[currentIndex - 1].id}`);
  };

  const goNext = () => {
    if (!hasNext) return;
    navigate(`/talent-spotting/talent-profile/employee/${employees[currentIndex + 1].id}`);
  };

  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="flex flex-1 justify-center py-5 px-4 md:px-8 lg:px-20">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 gap-6">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap gap-2 items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="material-symbols-outlined">chevron_right</span>
            <Link to="/talent-spotting/screening-dashboard" className="text-gray-500 hover:text-primary">
              Screening Dashboard
            </Link>
            <span className="material-symbols-outlined">chevron_right</span>
            <span className="font-medium">Talent Details</span>
          </nav>

          {/* Profile Header */}
          <ProfileHeader
            emp={empData}
            currentIndex={currentIndex + 1}
            total={total}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={goPrev}
            onNext={goNext}
          />

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <AssessmentResults empData={empData} />
              <ProjectPerformance empData={empData} />
              <OAAPScore empData={empData} />
            </div>

            <div className="flex flex-col gap-6">
              <HRISData empData={empData} />
              <AIInsight empData={empData} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
