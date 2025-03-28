import mongoose from "mongoose";


const MONGO_URI=process.env.MONGO_URI!

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable in .env.local");
    
}

let cached=global.mongoose

if (!cached) {
    cached=  global.mongoose={conn:null, promise:null}
}

export async function connectToDatabase(){
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts={
            
            bufferCommands:true,
            maxPoolSize:10,

        }
        cached.promise=mongoose.connect(MONGO_URI,opts).then(()=>mongoose.connection)
    }

    try {
        cached.conn=await cached.promise
    } catch (err) {
        cached.promise=null
        console.log(err);
        
    }
    return cached.conn

   
}