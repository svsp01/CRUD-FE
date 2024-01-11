"use client"
import React, { useEffect } from 'react'
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
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { BASE_URL } from '@/config'
import { useRouter } from 'next/navigation'



function LoginForm() {

    const router = useRouter()

    const getUser = async () => {
        const response = await fetch("http://127.0.0.1:5000/users");
        const movies = await response.json();
        console.log(movies);
    }

    useEffect(() => {
        getUser()
    }, [])

    const formSchema = z.object({
        email: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // localStorage.setItem("token", "Dafd")
        const userData = {
            email: values.email,
            password: values.password,
        };

        axios.post(`${BASE_URL}/admin/login`, userData)
            .then(response => {
                console.log('Login successfully:', response.data);
                localStorage.setItem("token", response.data.token);
                router.push("/dashboard")
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
        console.log(values)
    }
    return (
        <div className='w-full flex min-h-screen justify-center items-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full'>Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default LoginForm