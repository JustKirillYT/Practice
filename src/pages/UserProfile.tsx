import React from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>ID пользователя: {id}</p>
    </div>
  );
}

export default UserProfile;