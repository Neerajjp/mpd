import React, { useState } from "react";
import { getAuthToken } from "../services/auth";
import { tabWidth } from "../utils/tabWidth";

export const SidebarContext = React.createContext({});
/**
 * 
 * @param {*} param0 component  
 * @returns current user info provider
 */
const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(tabWidth ? false : true);
  const [isLogin, setIsLogin] = useState(getAuthToken())
  const [headerName,setHeaderName] = useState('')

  return (
    <SidebarContext.Provider value={{ isLogin, setIsLogin,sidebar , setSidebar, headerName, setHeaderName }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
