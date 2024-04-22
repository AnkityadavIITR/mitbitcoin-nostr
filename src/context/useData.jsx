"use client"
import React, { useState } from 'react'
import { createContext,useContext } from 'react'

const context = createContext();
const { Provider } = context;

export const UserProvider = ({children}) => {
    const [nostrKey, setNostrKey]=useState(false);
    const [courseId, setCourseId]=useState(false);
  return (
    <Provider
    value={{
        nostrKey,
        setNostrKey,
        courseId,
        setCourseId
    }}>
        {children}
    </Provider>
  )
}


const useData=()=>useContext(context);

export default useData;
