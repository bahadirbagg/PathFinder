import React, { useState } from 'react';

function SearchAndFilter({ setPage, setPerPage, setOrderBy, setSearch }) {
  const [selectedField, setSelectedField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOrderByChange = (e) => {
    const field = e.target.value;
    setSelectedField(field);

    if (field) {
      setOrderBy({ field, direction: 'desc' });
    } else {
      setOrderBy(null);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearch({ field: 'name', query });
  };

  return (
    <div className="bg-gray-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center w-full md:w-auto">
        <label className="mr-2 font-bold text-lg">Sort By:</label>
        <select
          className="flex-grow md:flex-grow-0 p-2 bg-white border border-gray-300 rounded w-full md:w-auto"
          value={selectedField}
          onChange={handleOrderByChange}
        >
          <option value="" disabled hidden>
            Select a field
          </option>
          <option value="createdAt">Date Created</option>
          <option value="salary">Salary</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="flex-grow p-2 bg-white border border-gray-300 rounded w-full md:w-auto"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchAndFilter;
