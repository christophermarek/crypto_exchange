import React, { useState } from "react"
import { FC } from "react";


export type UserContextState = {
  token: string;
  updateToken: (token: string) => void;
};

const contextDefaultValues: UserContextState = {
  token: '',
  updateToken: () => {}
};

const UserContext = React.createContext<UserContextState>(
  contextDefaultValues
);


const UserProvider : FC = ({ children }) => {
  const [token, setToken] = useState<string>(contextDefaultValues.token);
  const updateToken = (newToken: string) => setToken(newToken);

  return (
    <UserContext.Provider value={{token, updateToken}}>
      {children}
    </UserContext.Provider>
  )
}
export { UserContext, UserProvider }