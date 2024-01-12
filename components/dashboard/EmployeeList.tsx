"use client"
import React, { useEffect, useState } from 'react'
import userService from '../../services/userservices/usersService';

import { PenIcon } from 'lucide-react';
import axios from 'axios';


function EmployeeList({open, setActiveId}: any) {
    const [employeeList, setEmployeeList]: any = useState([])
    const [hoveredCard, setHoveredCard]: any = useState(null);

    const getUser = async () => {
      const data = await userService.getUsersList();
        setEmployeeList(data)
        console.log(data);
    }

    const hanldEditClick = (id: any)=>{
      open(true)
      setActiveId(id)
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
          <div className="flex flex-wrap">
            {employeeList &&
              employeeList.map((employee: any, index: number) =>{
                return (
                <div
                  key={employee._id}
                  className={`border relative rounded-lg border-gray-300 transition-shadow p-4 m-4 w-64 ease-in-out hover:shadow-lg`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {employee.name.firstName} {employee.name.lastName}
                  </h3>
                  <p className="text-base mb-2">Email: {employee.email}</p>
                  <p className="text-base">Position: {employee.position}</p>
                  {hoveredCard === index && (
                      <div 
                      onClick={()=>{
                        hanldEditClick(employee.empId)
                      }}
                      className='absolute transition-transform transform  text-gray-500 hover:scale-105 shadow-lg ease-in-out top-0 right-0 p-2 cursor-pointer border rounded-full '>
                        <PenIcon/>
                      </div>
                    )}
                </div>
              )})}
          </div>
        </div>
      );
    }
    
    export default EmployeeList;