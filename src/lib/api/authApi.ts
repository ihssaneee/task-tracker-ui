import type { LoginDto, RegisterDto, AuthResponse } from "@/types/auth";
import { fetchClient } from "./client";



export async function registerUser( user: RegisterDto){
    const res = await fetchClient<AuthResponse>("/auth/register",
        {
            method: "POST",
            body: JSON.stringify(user),
        }
    );
   if (res.token) {
        localStorage.setItem("token", res.token);
    }
};

export async function login(user: LoginDto){
    const rest= await fetchClient<AuthResponse>("/auth/login",{
        method: "POST",
        body: JSON.stringify(user),
    });
    if (rest.token) {
        localStorage.setItem("token", rest.token);
    }
}


export  function Logout(): void {
    localStorage.removeItem("token");
}


