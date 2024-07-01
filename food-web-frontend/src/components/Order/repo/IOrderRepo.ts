import type { IOrder } from "../models/IOrder";

export interface IOrderRepo {
    saveOrder(order: IOrder): Promise<boolean>;
    updateOrder(order: IOrder): Promise<boolean>;
    deleteOrder(order: IOrder): Promise<boolean>;
    ListOrder(): Promise<IOrder[]>;
    imageToUrl(title: string, imageFile: File): Promise<string>;
    getOrderById(id: string): Promise<IOrder | null>;
}
