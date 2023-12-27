// CacheContext.js
import React, { createContext, useContext, useState } from 'react';

const CacheContext = createContext();

export const CacheProvider = ({ children }) => {
  const [cache, setCache] = useState({});

  const setCachedData = (key, data) => {
    setCache((prevCache) => ({ ...prevCache, [key]: data }));
  };

  const getCachedData = (key) => cache[key];

  return (
    <CacheContext.Provider value={{ setCachedData, getCachedData }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => useContext(CacheContext);
