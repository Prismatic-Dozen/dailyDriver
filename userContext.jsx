import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext(null);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [likedImages, setLikedImages] = useState([]);

  const addLikedImage = (image) => {
    setLikedImages((prevLikedImages) => [...prevLikedImages, image]);
  };

  const removeLikedImage = (imageId) => {
    setLikedImages((prevLikedImages) =>
      prevLikedImages.filter((image) => image.id !== imageId)
    );
  };

  return (
    <UserContext.Provider value={{ user, setUser, likedImages, addLikedImage, removeLikedImage }}>
      {children}
    </UserContext.Provider>
  );
};
