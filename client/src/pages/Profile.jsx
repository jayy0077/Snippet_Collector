import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="profile-card">
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {user.displayName || 'Anonymous'}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <img src={user.photoURL} alt="Profile" style={{ width: 80, borderRadius: '50%' }} />
    </div>
  );
};

export default Profile;
