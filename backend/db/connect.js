import mongoose from "mongoose";




export async function connectDB(connectionString){

    try {
        await mongoose.connect(connectionString)

        console.log("connected to db successfully.")
    } catch (error) {
        console.log(error)
    }

}
