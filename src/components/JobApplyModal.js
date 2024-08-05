import React from 'react';

function JobApplyModal({ isOpen, onClose, job, onApply, errorMessage }) {
  if (!isOpen) return null;

  const formattedSalary = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.salary);
  const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(job.createdAt));

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-800 font-bold text-xl">✖</button>
        <h2 className="text-xl font-bold mb-4 text-center">Apply Job</h2>
        <div className="space-y-2">
          <p><strong>Company Name:</strong> {job.companyName}</p>
          <p><strong>Job Name:</strong> {job.name}</p>
          <p><strong>Created At:</strong> {formattedDate}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <div>
            <p className="font-bold">Keywords:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.keywords && job.keywords.map((keyword, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <p><strong>Salary:</strong> {formattedSalary}</p>
          <div>
            <p className="font-bold">Job Description:</p>
            <div className="border border-gray-300 rounded p-4">
              <p>{job.description}</p>
            </div>
          </div>
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
          )}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">
            Close
          </button>
          <button onClick={() => onApply(job)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobApplyModal;
