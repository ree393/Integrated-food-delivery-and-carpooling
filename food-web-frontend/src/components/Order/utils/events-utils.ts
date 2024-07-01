import { notyf } from "../../../config/notyf.ts";
import type { IOrder } from "../models/IOrder";

const showErrorToast = (msg: string = "something went wrong") => {
    notyf.error(msg);
};

function showSuccessToast(message: string = "success") {
    notyf.success(message);
}

export interface MapItem {
    id: string | number;
    position: { lat: number; lng: number };
    title: string;
}

function mapOrderItemsForMap(order: IOrder): MapItem[] {
    return order.items.map((item, index) => ({
        id: index + 1, // Assuming unique identifier for each item
        position: { lat: getRandomLatitude(), lng: getRandomLongitude() }, // Generate random coordinates
        title: `${item.quantity} ${item.title} Order`, // Customizing title
    }));
}

// Example function to generate random latitude
function getRandomLatitude(): number {
    return Math.random() * (90 - (-90)) + (-90);
}

// Example function to generate random longitude
function getRandomLongitude(): number {
    return Math.random() * (180 - (-180)) + (-180);
}


export { showErrorToast, showSuccessToast , mapOrderItemsForMap};
