import React, { useState, useEffect } from 'react';
import { updateUser } from '../services/apiService';

function UserProfilePopup({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    profileImage: '',
    dateOfBirth: '',
    address: {
      details: '',
      city: '',
      country: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        surname: user.surname || '',
        phone: user.phone || '',
        profileImage: user.profileImage || '',
        dateOfBirth: user.dateOfBirth || '',
        address: {
          details: user.address?.details || '',
          city: user.address?.city || '',
          country: user.address?.country || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [addressField]: value }
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const updatedUser = await updateUser(formData);
      onUpdate(updatedUser);
      onClose();
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.response?.data?.message || 'Failed to update. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: 'black' }}
            />
          </div>
          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Surname</label>
            <input
              id="surname"
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: 'black' }}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: 'black' }}
            />
          </div>
          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image URL</label>
            <input
              id="profileImage"
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: 'black' }}
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: 'black' }}
            />
          </div>
          <div>
            <label htmlFor="address.details" className="block text-sm font-medium text-gray-700">Address Details</label>
            <input
              id="address.details"
              type="text"
              name="address.details"
              value={formData.address.details}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: 'black' }}
            />
          </div>
          <div>
            <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              id="address.city"
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: 'black' }}
            />
          </div>
          <div>
            <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              id="address.country"
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{ color: 'black' }}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfilePopup;
