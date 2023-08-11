import { Schema, connect, model } from 'mongoose'

export interface IProduct {
    name: string
    price: number
}

const productSchema: Schema<IProduct> = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export const Product = model('Product', productSchema)