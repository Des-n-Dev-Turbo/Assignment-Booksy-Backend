import mongoose from 'mongoose';

const uri = `mongodb+srv://${encodeURIComponent(process.env.MONGODB_USER_NAME)}:${encodeURIComponent(
  process.env.MONGODB_PASSWORD
)}@booksy-app.hyl3aql.mongodb.net/db?retryWrites=true&w=majority`;

const connectDb = () => {
  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected Successfully!'))
    .catch((err) => {
      console.log('DB Connection failed!');
      console.log(err);
      process.exit(1);
    });
};

export default connectDb;
