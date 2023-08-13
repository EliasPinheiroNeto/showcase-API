import { Schema, model, Types, InferSchemaType } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    pictures: {
        type: [String],
        default: () => {
            const arr: string[] = []
            return arr
        }
    },
    category: {
        ref: 'Category',
        type: Types.ObjectId,
        required: true,
    }
})

type ProductType = InferSchemaType<typeof productSchema>

const Product = model<ProductType>('Product', productSchema)
export default Product