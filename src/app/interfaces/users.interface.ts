export interface User {
    _id: string;
    name: string;
    email?: string; 
    role: 'admin' | 'parent' | 'child';
    age?: number;          
    parent_id?: string;    
    createdAt?: string;    
    updatedAt?: string;   
    verified?: boolean; 
    emailToken? : string
    emailTokenExpires? :string;
}

