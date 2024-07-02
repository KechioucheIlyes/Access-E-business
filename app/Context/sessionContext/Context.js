'use client'
import React, { createContext, useState, useContext } from "react";
import { SessionProvider, useSession } from 'next-auth/react';

const myContext = createContext()


export const SessionContext = ({ children }) => {
    const { data: session, status } = useSession()

    const [sessionData, setSessionData] = useState(session);

    useEffect(() => {
        setSessionData(session);
    }, [session]);

    return (
        <SessionProvider session={sessionData}>
            {children}
        </SessionProvider>
    );



}

export const useSessionContext = () => useContext(SessionContext);
