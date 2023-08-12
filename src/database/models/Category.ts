import { model, Schema, InferSchemaType } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true }
})

type CategoryType = InferSchemaType<typeof categorySchema>

const Category = model<CategoryType>("Category", categorySchema)
export default Category