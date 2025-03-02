import mongoose from "mongoose";
// localhost is equal to 127.0.0.1
const Database = async () => {
  const url = "mongodb://127.0.0.1:27017/finmanager";
  const {connection} = await mongoose.connect(url);

  console.log(`MongoDB connetion succesfull to ${connection.host}`);
};

export default Database;
