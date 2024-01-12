"use client"
import React, { useEffect, useState } from 'react'
import userService from '../../services/userservices/usersService';

import axios from 'axios';
import { DeletIcon, PenIcon } from '../common/icons';


function EmployeeList({ open, setActiveId }: any) {
  const [employeeList, setEmployeeList]: any = useState([])
  const [hoveredCard, setHoveredCard]: any = useState(null);

  const getUser = async () => {
    const data = await userService.getUsersList();
    setEmployeeList(data)
    console.log(data);
  }

  const hanldEditClick = (id: any) => {
    open(true)
    setActiveId(id)
  }

  const hanldDeleteClick = async (id: any) => {
    const data = await userService.deleteUserById(id);
    console.log(data)
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      <div className="flex flex-wrap">
        {employeeList &&
          employeeList.map((employee: any, index: number) => {
            return (
              <div
                key={employee._id}
                className="bg-white border rounded-lg overflow-hidden shadow-md transition-transform transform p-4 m-4 w-64 hover:scale-105"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 className="text-xl font-semibold mb-2">
                  {employee?.name?.firstName} {employee?.name?.lastName}
                </h3>
                <p className="text-gray-600 text-base mb-2">Email: {employee.email}</p>
                <p className="text-gray-600 text-base">Position: {employee.position}</p>
                {hoveredCard === index && (
                  <div
                    onClick={() => {
                      hanldEditClick(employee.empId);
                    }}
                    className="absolute text-gray-500 top-0 right-0 p-2 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-transform transform ease-in-out"
                  >
                    <PenIcon />
                  </div>
                )}
                {hoveredCard === index && (
                  <div
                    onClick={() => {
                      hanldDeleteClick(employee._id);
                    }}
                    className="absolute text-gray-500 bottom-0 right-0 p-2 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-transform transform ease-in-out"
                  >
                    <DeletIcon />
                  </div>
                )}
              </div>

            )
          })}
      </div>
    </div>
  );
}

export default EmployeeList;