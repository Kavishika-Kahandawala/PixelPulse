import { ProjectInterface, UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  userID: string;
  projectId: string;
};

const RelatedProjects = async ({ userID, projectId }: Props) => {
  const result = (await getUserProjects(userID)) as { user?: UserProfile };
  const filteredProjects = result?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node?.id !== projectId
  );
  if (filteredProjects?.length === 0) {
    return null;
  }
  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flex justify-between items-center">
        <p className="text-base font-bold">More By {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-5">
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
          <div
            className="flex-col rounded-2xl min-w-[210px] min-h-[197px] drop-shadow-card"
            key={node?.id}
          >
            <Link
              href={`/project/${node?.id}`}
              className="flex justify-center items-center group relative w-full h-full"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt={node?.title}
              />
              <div className="hidden group-hover:flex justify-end items-end w-full h-1/3 bg-gradient-to-b from-transparent to-black/50 rounded-b-2xl gap-2 absolute bottom-0 right-0 font-semibold text-lg text-white p-4">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
