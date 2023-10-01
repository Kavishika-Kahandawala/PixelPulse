"use client";
import { deleteUserProjects, fetchToken } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  projectId: string;
};
const ProjectActions = ({ projectId }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteUserProjects(projectId, token);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flex justify-center items-center p-3 text-gray-100 bg-light-white-400  rounded-lg text-sm font-medium"
      >
        <Image src={"/pencile.svg"} width={15} height={15} alt="Edit" />
      </Link>
      <button
        type="button"
        className={`flex justify-center items-center p-3 text-gray-100 hover:bg-red-600 rounded-lg text-sm font-medium ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        title="Delete"
        onClick={handleDeleteProject}
      >
        <Image src={"/trash.svg"} width={15} height={15} alt="Delete" />
      </button>
    </>
  );
};

export default ProjectActions;
