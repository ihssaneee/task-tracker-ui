"use client"
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/authApi";
import { RegisterDto } from "@/types/auth";
import Link from 'next/link';
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import {  toast } from 'react-toastify';


export default function RegisterPage(){
    const router = useRouter();
    const [formData,setFormData]= useState({
        name: "",
        email: "",
        password: ""
    });

    const {mutate:handleRegister,isPending,error} = useMutation({
        mutationFn: registerUser,
        onSuccess: () =>{
            toast.success("Registration successful! Please log in.");
            router.push("/login");

        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleRegister(formData as RegisterDto);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="p-4 w-full max-w-md">
                <CardHeader className="my-2">
                    <CardTitle className="font-medium">Create an Account</CardTitle>
                    <CardDescription className="text-sm">
                        Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className=""
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Label htmlFor="email" className="">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="HdO6o@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className=""
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Label htmlFor="password" className="">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                className=""
                            />
                        </div>
                        <Button type="submit" disabled={isPending} className="my-6 w-full flex items-center justify-center cursor-pointer " >
                            {isPending && <Loader2 className="animate-spin" />}
                            {isPending ? <span className="ml-2">Registering...</span> : <span className="ml-2">Register</span>}
                        </Button>
          
                    </CardContent>
                </form>
            </Card>

        </div>
    )



}