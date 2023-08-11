import { connect } from "mongoose";

export default function connectDB(): void {
    connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
}