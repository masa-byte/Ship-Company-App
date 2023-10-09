
export interface User {
    id: number;
    email: string;
    password?: string;
    name: string;
    surname: string | null;
    birthDate: Date | null;
    phone: string;
    address: string;
    type: string;
}
