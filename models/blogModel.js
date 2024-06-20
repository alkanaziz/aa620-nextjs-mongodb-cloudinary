import mongoose from "mongoose";

const { Schema, model } = mongoose;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    imgpub: {
      type: String,
    },
  },
  { timestamps: true },
);

const Blog = mongoose?.models?.Blog || model("Blog", blogSchema);

export default Blog;