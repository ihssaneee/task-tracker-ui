"use client"
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/authApi";
import { LoginDto } from "@/types/auth";
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
export default function LoginPage(){
    const router = useRouter();
    const [formData,setFormData]= useState({
        email: "",
        password: ""
    });

    const {mutate:handleLogin,isPending,error} = useMutation({
        mutationFn: login,
        onSuccess: () => {
            router.push("/tasks");
        },
        onError: (error) => {
            toast.error(error.message);
        }

    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin(formData as LoginDto);
       
};
    return (
       <div className="flex items-center justify-center min-h-screen  bg-gray-100">
        <Card className="w-full max-w-md p-6">
            <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
           <form onSubmit={handleSubmit}>
            <CardContent className="">
                {error && (
                    <Alert variant="destructive" className="my-2">
                        <AlertCircle className="" />
                        <AlertDescription className="">
                            {error.message}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" placeholder="Enter your email" onChange={handleChange}
                     value={formData.email} />

                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" placeholder="••••••••" onChange={handleChange}
                     value={formData.password} />

                </div>
                <Button type="submit" disabled={isPending} className="mt-6 w-full flex items-center justify-center cursor-pointer" >
                    {isPending && <Loader2 className="animate-spin" />}
                    {isPending ? <span className="ml-2">Signing in...</span> : <span className="ml-2">Sign In</span>}
                
                </Button>
            </CardContent>
           </form>
           <CardFooter className="m-4 justify-center">
            <p className="text-muted-foreground text-sm">
                Don&apos;t have an account?
                <Link href="/register" className="text-blue-500 hover:underline ml-1 font-medium">
                    Sign Up
                </Link>

            </p>
           </CardFooter>

        </Card>
       </div>

       
    
    )
}

