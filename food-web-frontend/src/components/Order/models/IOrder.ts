export interface IOrder {
    id: string;
    items: OrderItem[];
    total: number;
    user:OrderUser;
    location:{lat:number,long:number}
    type:'Ride'| 'Food',
    shippingAddress:null,
    date:Date
}
export interface ShippingAddress{
    name: string,
    email: string,
    phone: number,
    address: string,
    city: string,
    postalCode: string,
    country: string,
}
export interface OrderUser {
    uid: string;
    userName: string;
    email: string | null;
    phone: string;
}
export interface OrderItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}
