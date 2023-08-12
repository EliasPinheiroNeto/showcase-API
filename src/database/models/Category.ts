import { Model, model, Schema, Document } from "mongoose";

export interface ICategory {
    name: string
}

export type CategoryModel = Model<ICategory>

const categorySchema = new Schema<ICategory, CategoryModel>({
    name: { type: String, required: true }
})

const Category = model<ICategory, CategoryModel>("Category", categorySchema)
export default Category