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


function DialogeForm({ open, close, data, setData, setActiveId, activeId }: any) {
    console.log(data,"data");
    
    const formSchema = z.object({
        firstname: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        lastname: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        empId: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        email: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        gender: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        dateOfBirth: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        phoneNumber: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        department: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        position: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        salary: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { 
        firstname: data?.name?.firstname  || "",
        lastname: data?.name?.firstname || "",
        empId: data?.empId || "",
        email: data?.email || "",
        gender: data?.gender ? data?.gender : "",
        dateOfBirth: data?.dateOfBirth || "",
        phoneNumber: data?.phoneNumber || "",
        department: data?.department || "",
        position: data?.position || "",
        salary: data?.salary || "",}
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
        const userData = {
            name: {
                firstName: values.firstname,
                lastName: values.lastname,
            },
            email: values.email,
            empId: values.empId,
            gender: values.gender,
            dateOfBirth: values.dateOfBirth,
            phoneNumber: values.phoneNumber,
            department: values.department,
            position: values.position,
            salary: values.salary,
        };
        console.log(userData, "entered values")
        if (activeId === ""){
            const data = await userService.addUser(userData);
            console.log(data);
        }else {
            const data = await userService.editUser(userData, activeId);
            console.log(data);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }    
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={()=>{
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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                    placeholder="First name" 
                                                    {...field}
                                                    // value={defaultValues?.firstName}

                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                    {...field}
                                                    defaultValue={data?.name?.lastName && data?.name?.lastName}
                                                     placeholder="Last name"  />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email"
                                                    {...field}
                                                    defaultValue={data?.email && data?.email}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="empId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employee Id</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Employee Id"
                                                    {...field}
                                                    defaultValue={data?.empId && data?.empId}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="gender" 
                                                    {...field}
                                                    defaultValue={data?.gender && data?.gender}
                                                     />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="dateOfBirth"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date Of Birth</FormLabel>
                                                <FormControl>
                                                    <Input type='date' placeholder="Date Of Birth"
                                                    {...field} 
                                                    defaultValue={data?.dateOfBirth && moment(data?.dateOfBirth).format('YYYY-MM-DD')}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>PhoneNumber</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="phoneNumber"
                                                    {...field}
                                                    defaultValue={data?.phoneNumber && data?.phoneNumber}                                                    
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="department"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Department</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="department"
                                                    {...field}
                                                    defaultValue={data?.department && data?.department}
                                                     />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="position"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Role" 
                                                    defaultValue={data?.position && data?.position}
                                                    {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="salary"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Salary</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="salary" 
                                                    {...field}
                                                    defaultValue={data?.salary && data?.salary}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Button className='w-full' type="submit">Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default DialogeForm