import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../utilities/DataProvider';
import ProfileHeader from '../../components/ProfileHeader';
import AssessmentResults from '../../components/AssessmentResults';
// import ProjectPerformance from '../../components/ProjectPerformance';
// import OAAPScore from '../../components/OAAPScore';
// import HRISData from '../../components/HRISData';
// import AIInsight from '../../components/AIInsight';
import { AuthContext } from '../../utilities/AuthProvider';
import CommentsTextarea from '../../components/CommentsTextarea';
import StarRating from '../../components/StarRating';

export default function TalentProfile() {
  const { user } = useContext(AuthContext);
  const { empId } = useParams();
  const navigate = useNavigate();
  const { data: employees, loading, refetchData } = useContext(DataContext);

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
            <Link to="/" className="text-gray-500 hover:text-primary dark:hover:text-white">Home</Link>
            <span className="material-symbols-outlined">chevron_right</span>
            <Link to="/talent-spotting/talent-dashboard" className="text-gray-500 hover:text-primary dark:hover:text-white">
              Talent Dashboard
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

        <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-gray-800 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-800 flex justify-between items-center gap-2 bg-gray-50/50 dark:bg-gray-800/50">
          <span className="material-symbols-outlined text-primary">fact_check</span>
          <h3 className="text-[#111318] dark:text-white text-lg font-bold">Spotting Results</h3>
          </div>
        </div>
          <div className="p-6 grid grid-cols-1 gap-8">
            <CommentsTextarea
              label="On top of Situation (OTOS)"
              subLabel={<StarRating
                value={empData.otos_rating}
                readOnly={true} label="Alloted Rating: "
              />}
              placeholder="Add qualities demonstrating awareness of role, SPPBMs, market, consumer and product understanding..."
              value={empData.otos_comment}
              readOnly={true}
              suggestions={["Deep product insight", "Clear SPPBMs understanding", "Market-back thinking"]}
            />

            <CommentsTextarea
              label="Entrepreneurial approach"
              subLabel={<StarRating
                value={empData.entrepreneur_rating}
                readOnly={true} label="Alloted Rating: "
              />}
              placeholder="Add examples displaying initiative, resourcefulness and ownership in solving problems and driving opportunities..."
              value={empData.entrepreneur_comment}
              readOnly={true}
              suggestions={["Bias for action", "Resourceful problem solving", "End-to-end ownership"]}
            />

            <CommentsTextarea
              label="Positive dissatisfaction"
              subLabel={<StarRating
                value={empData.dissatisfaction_rating}
                readOnly={true} label="Alloted Rating: "
              />}
              placeholder="Describe instances of challenging the status quo, seeking improvement and higher benchmarks..."
              value={empData.dissatisfaction_comment}
              readOnly={true}
              suggestions={["Raises benchmarks", "Drives continuous improvement", "Challenges status quo constructively"]}
            />

            <CommentsTextarea
              label="Intellectual humility"
              subLabel={<StarRating
                value={empData.humility_rating}
                readOnly={true} label="Alloted Rating: "
              />}
              placeholder="Add behavioural traits relating to learning mindset, acknowledging limitations and valuing diverse perspectives..."
              value={empData.humility_comment}
              readOnly={true}
              suggestions={["Seeks feedback", "Learns from mistakes", "Credits team contributions"]}
            />

            <CommentsTextarea
              label="Empathy"
              subLabel={<StarRating
                value={empData.empathy_rating}
                readOnly={true} label="Alloted Rating: "
              />}
              placeholder="Elaborate on positive demeanor like the inclination to support others in order to enable collective success..."
              value={empData.empathy_comment}
              readOnly={true}
              suggestions={["Context-aware support", "Active listening", "Enables cross-team success"]}
            />
          </div>
          </div>

          {/* Content */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <AssessmentResults empData={empData} userRole={user?.role} onSubmit={refetchData} />
            {/* <ProjectPerformance empData={empData} />
              <OAAPScore empData={empData} /> */}
          </div>

          {/* <div className="flex flex-col gap-6">
              <HRISData empData={empData} />
              <AIInsight empData={empData} />
            </div> */}
          {/* </div> */}

        </div>
      </div>
    </div>
  );
}
