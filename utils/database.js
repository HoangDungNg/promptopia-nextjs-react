import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true, // allow users to fall back to the old parser if they find a bug in the new parser
      useUnifiedTopology: true, //  using the MongoDB driver's new connection management engine
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
};
