import React, { useState, useEffect } from 'react';
import UserProfilePopup from './UserProfilePopup';
import logo from "../logo.svg";

function DashboardHeader({ user, onLogoutClick }) {
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  const handleAvatarClick = () => setProfilePopupOpen(true);
  const handleClose = () => setProfilePopupOpen(false);

  const handleUpdate = (updatedUser) => {
    if (Object.keys(updatedUser).length > 0) {
      setUserInfo(updatedUser);
    }
    setProfilePopupOpen(false);
  };

  return (
    <header className="flex flex-wrap justify-between items-center p-4 bg-blue-600 text-white">
      <div className="flex items-center">
        <a href="#">
          <img src={logo} alt="JobFinder Logo" className="h-10 mr-2" />
        </a>
        <span className="text-lg font-bold">PathFinder</span>
      </div>
      <div className="flex items-center mt-2 lg:mt-0">
        {userInfo ? (
          <>
            <span className="mr-4">{userInfo.email}</span>
            <img
              src={userInfo.profileImage || 'https://via.placeholder.com/150'}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={handleAvatarClick}
            />
            <span
              onClick={onLogoutClick}
              className="ml-4 cursor-pointer hover:underline"
            >
              Logout
            </span>
          </>
        ) : (
          <span>Loading...</span>
        )}
        {isProfilePopupOpen && userInfo && (
          <UserProfilePopup user={userInfo} onClose={handleClose} onUpdate={handleUpdate} />
        )}
      </div>
    </header>
  );
}

export default DashboardHeader;
