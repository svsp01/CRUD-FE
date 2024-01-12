"use client"
import AddEmployee from '@/components/dashboard/AddEmployee'
import DialogeForm from '@/components/dashboard/DialogeForm'
import EmployeeList from '@/components/dashboard/EmployeeList'
import userService from '@/services/userservices/usersService'
import React, { useEffect, useState } from 'react'

function page() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeId, setActiveId] =  useState("")
    const [activeData, setActiveData] = useState({})

    
    const getSpecificUser = async () =>{
            const data = await userService.getUserById(activeId)
            setActiveData(data)
            console.log("logged");
    }
    useEffect(()=>{
        if(activeId!==""){
            getSpecificUser()
        }
    }, [activeId])
    return (
        <div >
            <div className='w-full flex justify-end py-4 px-10'>
                <AddEmployee close={setIsOpen} />
            </div>
            <EmployeeList setActiveId={setActiveId} open={setIsOpen} />
            <DialogeForm data={activeData} open={isOpen} activeId={activeId} close={setIsOpen} setData={setActiveData} setActiveId={setActiveId} />
        </div>
    )
}

export default page