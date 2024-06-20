import Blog from "@/models/blogModel";
import { cloudinary } from "@/utils/cloudinary/cloudinaryConfig";
import connectDB from "@/utils/database/connectDB";
import { NextResponse } from "next/server";

// Get Blog by ID
export async function GET(request, { params }) {
  await connectDB();
  console.log(params);
  const { id } = params;

  try {
    const blog = await Blog.findById(id);
    return NextResponse.json(
      { message: "Blog by ID successfully fetched", blog },
      { status: 200 },
    );
  } catch (error) {
    console.log(`Error fetching blog by ID: ${error.message}`);
    return NextResponse.json(
      {
        message: "Error fetching blog by ID",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// Delete Blog by ID
export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const blog = await Blog.findById(id);

    if (blog) {
      // Delete img from Cloudinary
      await cloudinary.uploader.destroy(blog.imgpub);

      // Delete blog from Database
      await Blog.deleteOne({ _id: id });

      return NextResponse.json(
        { message: "Blog deleted", deletedBlog: blog },
        { status: 200 },
      );
    } else {
      throw new Error("Blog not found");
    }
  } catch (error) {
    console.log(`Error deleting blog by ID: ${error.message}`);
    return NextResponse.json(
      { message: `Error deleting blog by id, ${error.message}` },
      { status: 500 },
    );
  }
}
