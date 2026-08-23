export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto extends LoginDto {
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: User;
    expires_at: string;
    token: string;
}