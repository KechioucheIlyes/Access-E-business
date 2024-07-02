'use client'
import { createContext, useState, useContext } from "react";

const MyContext = createContext(null);


export const ResultContext = ({ children }) => {
    const [idEtude, setIdEtude] = useState(null);
    const [idClient, setIdClient] = useState(null);

    const contextValue = {
        idEtude,
        setIdEtude,
        idClient,
        setIdClient,
    };

    return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>



}


export const useMyContext = () => useContext(MyContext)
