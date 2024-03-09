import Mongoose from "mongoose";

const { Schema } = Mongoose;

const infoSchema = new Schema({
  category: String,
  description: String,
  analytics: String,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "PlaceMark",
  },
});

export const Info = Mongoose.model("Info", infoSchema);