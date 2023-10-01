"use client";
import { ProjectInterface, SessionInterface } from "@/common.types";
import { time } from "console";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from ".";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, fetchToken, updateUserProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

export default function ProjectForm({ type, session, project }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { token } = await fetchToken();
    try {
      if (type === "create") {
        //create project
        await createNewProject(form, session?.user?.id, token);
        router.push("/");
      }

      if (type === "edit") {
        await updateUserProject(form, project?.id as string, token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Please upload an Image file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };
  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex justify-center items-center flex-col w-full lg:pt-24 pt-12 gap-10 text-lg max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-start w-full lg:min-h-[400px] min-h-[200px] relative">
        <label
          htmlFor="poster"
          className="flex justify-center items-center z-10 text-center w-full h-full p-20 text-gray-100 border-2 border-gray-50 border-dashed"
        >
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          title="Upload an Image"
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Pixel pulse"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Elevate and explore your exceptional developer projects"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website Url"
        state={form.liveSiteUrl}
        placeholder="https://pixelpulse.vercel.app/"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="Github Url"
        state={form.githubUrl}
        placeholder="https://github.com/Kavishika-Kahandawala"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenu
        title="category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className="flex items-center justify-start w-full">
        <Button
          title={
            isSubmitting
              ? `${type == "create" ? "Creating" : "Editing"}`
              : `${type == "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}
