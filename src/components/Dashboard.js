import React, { useState, useEffect } from 'react';
import { getUser, getJobs, applyJob, withdrawJob, getJobById } from '../services/apiService';
import DashboardHeader from './DashboardHeader';
import SearchAndFilter from './SearchAndFilter';
import CompanyCard from './CompanyCard';
import AppliedJobs from './AppliedJobs';
import JobApplyModal from './JobApplyModal';
import Pagination from './Pagination';

function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState({ field: 'createdAt', direction: 'desc' });
  const [search, setSearch] = useState({ field: '', query: '' });
  const [totalJobs, setTotalJobs] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [page, perPage, orderBy, search]);

  const fetchUserData = async () => {
    try {
      const userData = await getUser();
      setUser(userData);

      if (userData.appliedJobs && userData.appliedJobs.length > 0) {
        const jobDetailsPromises = userData.appliedJobs.map(jobId => getJobById(jobId));
        const jobDetailsResponses = await Promise.all(jobDetailsPromises);
        setAppliedJobs(jobDetailsResponses);
      }
    } catch (error) {
      console.error('Error fetching user data or job details:', error);
      onLogout();
    }
  };

  const fetchJobs = async () => {
    try {
      const params = {
        page,
        perPage,
        'orderBy[field]': orderBy.field,
        'orderBy[direction]': orderBy.direction,
      };

      if (search.field && search.query) {
        params['search[field]'] = search.field;
        params['search[query]'] = search.query;
      }

      const response = await getJobs(params);
      setJobs(response.data);
      setTotalJobs(response.meta.total);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
    setErrorMessage('');
  };

  const handleApply = async (job) => {
    try {
      if (appliedJobs.some(appliedJob => appliedJob.id === job.id)) {
        setErrorMessage("Job already applied.");
        return;
      }

      await applyJob(job.id);
      setAppliedJobs([...appliedJobs, job]);
      setModalOpen(false);
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const handleWithdraw = async (job) => {
    try {
      await withdrawJob(job.id);
      setAppliedJobs(appliedJobs.filter(j => j.id !== job.id));
    } catch (error) {
      console.error('Error withdrawing from job:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-2/3">
          <div className="sticky top-0 z-50">
            <DashboardHeader user={user} onLogoutClick={onLogout} />
          </div>
          <div className="p-4">
            <SearchAndFilter
              setPage={setPage}
              setPerPage={setPerPage}
              setOrderBy={setOrderBy}
              setSearch={setSearch}
              orderBy={orderBy}
            />
            <div className="overflow-y-auto max-h-screen">
              <div className="flex flex-col gap-4">
                {jobs.map(job => (
                  <CompanyCard 
                    key={job.id} 
                    job={job} 
                    isApplied={appliedJobs.some(appliedJob => appliedJob.id === job.id)}
                    onDetailsClick={() => handleOpenModal(job)} 
                    onWithdrawClick={() => handleWithdraw(job)} 
                  />
                ))}
              </div>
            </div>
            <Pagination
              totalJobs={totalJobs}
              page={page}
              perPage={perPage}
              setPage={setPage}
              setPerPage={setPerPage}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3 bg-gray-100 p-4 overflow-y-auto">
          {user && <AppliedJobs user={user} jobs={appliedJobs} />}
        </div>
      </div>
      {selectedJob && (
        <JobApplyModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          job={selectedJob}
          onApply={() => handleApply(selectedJob)}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}

export default Dashboard;
