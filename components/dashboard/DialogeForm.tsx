import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import axios from 'axios';
import { BASE_URL } from '@/config'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import moment from "moment"
import userService from '@/services/userservices/usersService'
import { useFormik } from 'formik';
import { Label } from '../ui/label'


function DialogeForm({ open, close, data, setData, setActiveId, activeId }: any) {
    console.log(data, "data");
    const initialValues: any = {
        firstname: data?.name?.firstName,
        lastname: data?.name?.lastName,
        email: data?.email,
        empId: data?.empId,
        gender: data?.gender,
        dateOfBirth: data?.dateOfBirth ? moment(data?.dateOfBirth).format('YYYY-MM-DD') : '',
        phoneNumber: data?.phoneNumber,
        department: data?.department,
        position: data?.position,
        salary: data?.salary,
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    async function onSubmit(e: any) {
        e.preventDefault()
        console.log(e.target.firstName.value);

        try {
            const userData = {
                name: {
                    firstName: e.target.firstName.value,
                    lastName: e.target.lastName.value,
                },
                email: e.target.email.value,
                empId: e.target.empId.value,
                gender: e.target.gender.value,
                dateOfBirth: e.target.dateOfBirth.value,
                phoneNumber: e.target.phoneNumber.value,
                department: e.target.department.value,
                position: e.target.position.value,
                salary: e.target.salary.value,
            };
            console.log(userData, "entered values")
            if (activeId === "") {
                const data = await userService.addUser(userData);
                console.log(data);
                if (data) {
                    close()
                }
            } else {
                const datad = await userService.editUser(userData, data._id);
                console.log(datad);
                if (datad) {
                    close()
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={() => {
                close()
                setData({})
                setActiveId("")
            }}>
                <DialogContent style={{
                    maxWidth: "80vw",
                }}>

                    <DialogHeader>
                        <DialogTitle> {activeId === "" ? "Add" : "Edit"} Employee Details?</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <Label>First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    defaultValue={data?.name?.firstName}
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    defaultValue={data?.name?.lastName}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    defaultValue={data?.email}
                                />
                            </div>

                            <div>
                                <Label htmlFor="empId">Employee ID</Label>
                                <Input
                                    id="empId"
                                    name="empId"
                                    type="text"
                                    defaultValue={data?.empId}
                                />
                            </div>

                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Input
                                    id="gender"
                                    name="gender"
                                    type="text"
                                    defaultValue={data?.gender}
                                />
                            </div>

                            <div>
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    defaultValue={data?.dateOfBirth}
                                />
                            </div>

                            <div>
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    defaultValue={data?.phoneNumber}
                                />
                            </div>

                            <div>
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    name="department"
                                    type="text"
                                    defaultValue={data?.department}
                                />
                            </div>

                            <div>
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    name="position"
                                    type="text"
                                    defaultValue={data?.position}
                                />
                            </div>

                            <div>
                                <Label htmlFor="salary">Salary</Label>
                                <Input
                                    id="salary"
                                    name="salary"
                                    type="text"
                                    defaultValue={data?.salary}
                                />
                            </div>
                        </div>
                        <Button className="w-full" type="submit">
                            {activeId === "" ? "Submit" : "Update"}
                        </Button>
                    </form>

                </DialogContent>
            </Dialog>
        </div >
    )
}

export default DialogeForm