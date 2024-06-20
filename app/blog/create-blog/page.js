import CreateBlogForm from "@/components/CreateBlogForm";
import Link from "next/link";

const CreateBlog = () => {
  return (
    <div className="w-3/4 flex flex-col justify-center items-center">
      <CreateBlogForm />
    </div>
  );
};

export default CreateBlog;
