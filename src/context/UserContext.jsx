import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLevel, setUserLevel] = useState(() => {
    const savedLevel = localStorage.getItem('manara_user_level');
    return savedLevel || null; // levels could be 'Beginner', 'Intermediate', 'Advanced', or null if not taken
  });

  useEffect(() => {
    if (userLevel) {
      localStorage.setItem('manara_user_level', userLevel);
    }
  }, [userLevel]);

  return (
    <UserContext.Provider value={{ userLevel, setUserLevel }}>
      {children}
    </UserContext.Provider>
  );
};
