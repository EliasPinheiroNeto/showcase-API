import { Schema, model, Document } from 'mongoose'

export interface IProduct extends Document {
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

export const Product = model<IProduct>('Product', productSchema)