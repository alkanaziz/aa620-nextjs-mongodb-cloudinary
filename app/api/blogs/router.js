import Blog from "@/models/blogModel";
import { cloudinary } from "@/utils/cloudinary/cloudinaryConfig";
import connectDB from "@/utils/database/connectDB";
import { NextResponse } from "next/server";

// Test GET controller
export async function GET() {
  await connectDB();

  try {
    const blogs = await Blog.find({});
    return NextResponse.json(
      { message: "All blogs fetched", blogs },
      { status: 200 },
    );
  } catch (error) {
    console.log(`Error fetching blogs: ${error.message}`);
    return NextResponse.json(
      {
        message: "Error fetching blogs",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// Test POST controller
export async function POST(request) {
  const { title, description, image, imgpub } = await request.json();
  const uploadedImage = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: "blog_images",
      public_id: `${title}`,
      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "svg",
        "webp",
        "jfif",
        "ico",
      ],
    },

    function (error, result) {
      if (error) {
        console.log(`Error uploading image: ${error.message}`);
        return NextResponse.json(
          {
            message: "Error uploading image",
            error: error.message,
          },
          { status: 500 },
        );
      }
    },
  );

  const cloudImg = uploadedImage.secure_url;
  const cloudImgPub = uploadedImage.public_id;
  await connectDB();

  try {
    const newBlog = new Blog({
      title,
      description,
      image: cloudImg,
      imgpub: cloudImgPub,
    });

    await newBlog.save();
    return NextResponse.json(
      { message: "Blog created successfully", newBlog },
      { status: 201 },
    );
  } catch (error) {
    console.log(`Error creating blog: ${error.message}`);
    return NextResponse.json(
      { message: "Error creating blog", error: error.message },
      { status: 500 },
    );
  }
}
