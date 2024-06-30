import React, { useState, useEffect } from 'react';

const UserSearch = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    // Filter users whenever the search query changes
    setFilteredUsers(
      users.filter(user =>
        user.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  return (
    <>
      <input
        type="text"
        placeholder="Search for a username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </>
  );
};

export default UserSearch;
