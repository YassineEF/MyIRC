import mongoose from "mongoose";

export default function db(
  user: string | undefined,
  password: string | undefined
) {
  mongoose
    .connect(
      `mongodb+srv://${user}:${password}@cluster0.vobkeol.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connected to DB YES"))
    .catch((err) => console.log("Fail to connect DB : " + err));
}
