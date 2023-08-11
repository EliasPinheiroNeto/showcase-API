import { Schema, model, Document, Model } from 'mongoose'

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

const Product: Model<IProduct> = model<IProduct>('Product', productSchema)
export default Product