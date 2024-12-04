export interface OrderParameters{
    //Order Table
    OrderID?: number;
    FullName: string;
    Email: string;
    ShippingAddress: string;
    City: string;
    State: string;
    ZipCode: string

    //Shopping Cart Table.
    CartID: number;
    ProductID: string;
    Quantity: number;
    SubTotal: number;
    ShippingFee: number;
    FinalTotal: number;
}