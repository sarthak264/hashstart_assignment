import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [liked, setLiked] = useState([]);

  return (
    <UserContext.Provider value={{ liked, setLiked }}>
      {children}
    </UserContext.Provider>
  );
};
