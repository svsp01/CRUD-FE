import React from 'react'
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



function DialogeForm({ open, close, data }: any) {

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
            firstname: data?.name.firstname || "",
            lastname: data?.name.firstname || "",
            empId: data?.empId || "",
            email: data?.email || "",
            gender: data?.gender || "",
            dateOfBirth: data?.dateOfBirth || "",
            phoneNumber: data?.phoneNumber || "",
            department: data?.department || "",
            position: data?.position || "",
            salary: data?.salary || "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values, "entered values")
        const userData = {
            name: {
                firstname: values.firstname,
                lastname: values.firstname,
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

        axios.post(`${BASE_URL}/users/add`, userData)
            .then(response => {
                console.log('added successfully:', response.data);
                // localStorage.setItem("token", response.data.token);
                // router.push("/dashboard")
                close()
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={close}>
                <DialogContent style={{
                    maxWidth: "80vw",
                }}>

                    <DialogHeader>
                        <DialogTitle>Add Employee Details?</DialogTitle>
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
                                                    <Input placeholder="First name" {...field} />
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
                                                    <Input placeholder="Last name" {...field} />
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
                                                    <Input placeholder="Email" {...field} />
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
                                                    <Input placeholder="Employee Id" {...field} />
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
                                                    <Input placeholder="gender" {...field} />
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
                                                    <Input type='date' placeholder="Date Of Birth" {...field} />
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
                                                    <Input placeholder="phoneNumber" {...field} />
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
                                                    <Input placeholder="department" {...field} />
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
                                                    <Input placeholder="Role" {...field} />
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
                                                    <Input placeholder="salary" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default DialogeForm