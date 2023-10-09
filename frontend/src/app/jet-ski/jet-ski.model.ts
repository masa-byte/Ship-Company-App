
export interface JetSki {
    id: number;
    model: string;
    color: string;
    maxSpeed: number;
    rating: number;
    pricePerDay: euro;
}

type euro = number;