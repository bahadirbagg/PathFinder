import React from 'react';

function AppliedJobs({ user, jobs }) {
  return (
    <div className="w-full p-4 max-h-screen overflow-y-auto bg-gray-100 rounded-lg">
      <div className="flex flex-col items-center">
        {user.profileImage && (
          <img src={user.profileImage} alt="Profile" className="w-32 h-32 rounded-full mb-3 shadow-lg" />
        )}
        {user.email && <p className="mb-4 text-lg font-semibold">{user.email}</p>}
        <h2 className="font-bold text-xl mb-3">Applied Jobs</h2>
        <div className="space-y-4 w-full">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="bg-white shadow-lg rounded-lg p-6 w-full">
                <h3 className="text-xl font-bold text-center mb-2">{job.name}</h3>
                <p className="text-lg font-bold">Job Name: <span className="font-normal">{job.jobName}</span></p>
                <p className="font-bold">Company Name: <span className="font-normal">{job.companyName}</span></p>
                <p className="font-bold">Location: <span className="font-normal">{job.location}</span></p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No applied jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppliedJobs;
