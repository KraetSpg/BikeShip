export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    state?: string,
    country?: string,
    age?: number,
    userDesc?: string,
    bike?: number, 
    createdAt: string
}