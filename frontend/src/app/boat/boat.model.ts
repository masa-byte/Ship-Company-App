
export interface Boat {
    id: number;
    name: string;
    type: string;
    yearBuilt: number;
    capacity: number;
    rating: number;
    pricePerDay: euro;
}

type euro = number;