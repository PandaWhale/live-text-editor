import React from 'react';
import UserDisplay from '../Components/User-Display';
import User from '../Components/User';

function UserContainer() {
  return (
    <div>
      <UserDisplay />
      <User />
      <User />
      <User />
    </div>
  );
}

export default UserContainer;
