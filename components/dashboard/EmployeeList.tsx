"use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


function EmployeeList() {
    const [employeeList, setEmployeeList]: any = useState([])
    const getUser = async () => {
        const response = await fetch("http://127.0.0.1:5000/users/list");
        const movies = await response.json();
        setEmployeeList(movies)
        console.log(movies);
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <div>EmployeeList
            <div>
                {
                    employeeList && employeeList.map((item: any) => {
                        return (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{item.email}</CardTitle>
                                    <CardDescription>{item.position}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>

                        )
                    })

                }
            </div>
        </div>
    )
}

export default EmployeeList