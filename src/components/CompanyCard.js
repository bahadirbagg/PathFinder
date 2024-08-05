import React from 'react';

function CompanyCard({ job, onDetailsClick, onWithdrawClick, isApplied }) {
  const formattedSalary = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.salary);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 relative mb-4 w-full max-w-md md:max-w-full mx-auto md:mx-0">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-bold">{job.companyName} - {job.name}</h2>
          <p className="text-gray-700 mt-2">{job.description}</p>
          <p className="text-gray-500 mt-2">Location: {job.location}</p>
          <p className="text-gray-800 mt-2">{formattedSalary}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {job.keywords && job.keywords.map((keyword, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm">
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-stretch space-y-2 ml-4">
          <button
            onClick={onDetailsClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full md:w-auto"
          >
            Details
          </button>
          {isApplied && (
            <button
              onClick={onWithdrawClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full md:w-auto"
            >
              Withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
