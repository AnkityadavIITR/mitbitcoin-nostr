"use client"
import React, { useState } from 'react'
import { createContext,useContext } from 'react'

const context = createContext();
const { Provider } = context;

export const CourseProvider = ({children}) => {
    const [courseData, setCourseData]=useState(null);
  return (
    <Provider
    value={{
        courseData,
        setCourseData
    }}>
        {children}
    </Provider>
  )
}


const useCourse=()=>useContext(context);

export default useCourse;
