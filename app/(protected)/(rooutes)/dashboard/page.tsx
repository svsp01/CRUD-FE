"use client"
import AddEmployee from '@/components/dashboard/AddEmployee'
import DialogeForm from '@/components/dashboard/DialogeForm'
import EmployeeList from '@/components/dashboard/EmployeeList'
import React, { useState } from 'react'

function page() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div >
            <div className='w-full flex justify-end py-4 px-10'>
                <AddEmployee close={setIsOpen} />
            </div>
            <EmployeeList />
            <DialogeForm open={isOpen} close={setIsOpen} />
        </div>
    )
}

export default page