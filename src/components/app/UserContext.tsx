import React from "react";

interface User {
  emailAddress: string;
  firstName: string;
  authType: string;
}
export interface AppContextInterface {
  value: User;
  setUser: any;
}
const UserContext = React.createContext<AppContextInterface | null>(null);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
