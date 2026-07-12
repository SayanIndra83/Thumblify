import mongoose from "mongoose";

    
    let cache = global.mongoose
    if(!cache){
       cache = global.mongoose = ({connection: null, promise: null})
    }

const dbConnect = async():Promise<void> => {

    const url = process.env.MONGODB_URI
    // console.log(url)
        if(!url) {
            console.log("Please give a valid monogo url")
            throw Error("Please give a valid monogo url")
        }

    if(cache.connection) {
        console.log("DB already connected")
        return
    }

    if(!cache.promise) {
        cache.promise = mongoose.connect(url).then((conn) => conn.connection)
    }

    try {
        cache.connection = await cache.promise
        console.log("DB connected")
        return
    } catch (error) {
        console.log("DB connection failed")
        process.exit(1)
    }
}

export default dbConnect