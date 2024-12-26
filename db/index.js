import mongoose from 'mongoose';
import 'dotenv/config'

const uri = process.env.MONGO_URI;
const connectionDB = async () => {
  try { 
    await mongoose.connect(uri)
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error("Couldn't connect to MongoDB", err);
    process.exit(1);
  }
}
export default connectionDB;