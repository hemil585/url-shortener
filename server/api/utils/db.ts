import { connect } from 'mongoose'

export const connectionToDB = async () => {
    try {
        if (!process.env.MONGODB_URI) throw new Error('MongoDB URI not provided')

        await connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB!')

    } catch (error: any) {
        console.error(error.message)
    }
}