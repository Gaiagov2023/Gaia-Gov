import React from "react";

const drawerContext = React.createContext();

export const DrawerProvider = ({ children }) => {
  const auth = React.useState(true);
  return (
    <drawerContext.Provider value={auth}>{children}</drawerContext.Provider>
  );
};

const DrawerConsumer = () => {
  return React.useContext(drawerContext);
};
export default DrawerConsumer;
