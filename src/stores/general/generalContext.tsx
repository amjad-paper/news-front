import { createContext, useState } from "react";
import { IGeneralContext, GeneralPropsType } from "./generalTypes";

export const GeneralContext = createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider = ({ children }: GeneralPropsType) => {
  return <GeneralContext.Provider value={{}}>{children}</GeneralContext.Provider>;
};

export default GeneralContext;
