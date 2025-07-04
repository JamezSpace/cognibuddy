export interface AuthBodyInterface {
    name?: string;
    email?: string;  
    password: string;
    role: string; // 'child', 'parent', or 'admin'
}