import { connect } from "mongoose";

export default connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
