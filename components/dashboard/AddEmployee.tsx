"use client"
import React from 'react'
import { Button } from '../ui/button'

function AddEmployee({ close }: any) {
    return (
        <div>
            <Button onClick={close}>Add Employee</Button>
        </div>
    )
}

export default AddEmployee