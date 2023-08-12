import { Schema, model, Document, Model, Types } from 'mongoose'
import { ICategory } from './Category'

export interface IProduct {
    name: string
    price: number
    pictures: Types.Array<string>
    category: { ref: 'Category', type: Types.ObjectId }
}

export type ProductModel = Model<IProduct>

const productSchema = new Schema<IProduct, ProductModel>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    pictures: {
        type: [String]
    },
    category: {
        ref: 'Category',
        type: Types.ObjectId,
        required: true
    }
})

const Product = model<IProduct, ProductModel>('Product', productSchema)
export default Product