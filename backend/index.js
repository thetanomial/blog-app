import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import {connectDB} from './db/connect.js'
import postsRouter from './routes/posts.js'
const app = express()
app.use(express.json())

app.use('/api/v1/posts',postsRouter)

connectDB(process.env.MONGO_URI).then(()=>{
    app.listen(8000,()=>{
        console.log(`app is listening on port 8000`)
    })
})


