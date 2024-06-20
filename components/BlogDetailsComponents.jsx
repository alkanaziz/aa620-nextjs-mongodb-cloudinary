"use client";
import Image from "next/image";
import { deleteBlog } from "@/utils/actions/blogActions";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BlogDetailsComponent = ({ title, description, image, url, id }) => {
  const router = useRouter();

  const handleDeleteBlog = () => {
    deleteBlog(url, id);

    router.push("/");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="">
          <div className="mb-16">
            <Image src={image} alt={title} width={900} height={600} priority />
          </div>
          <h1 className="text-2xl font-bold md:text-5xl">{title}</h1>
          <p className="py-6 text-sm md:text-xl">{description}</p>
          <div className="flex justify-center gap-7">
            <Link href="/">
              <button className="btn border border-green-300 text-white hover:bg-green-500 hover:text-slate-900">
                Home
              </button>
            </Link>
            <button
              onClick={handleDeleteBlog}
              className="btn text-white hover:bg-red-700"
            >
              Delete
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetailsComponent;
