"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {

    const [randomLikesGen, setRandomLikesGen] = useState(0);
    const [randomViewsGen, setRandomViewsGen] = useState('');

    useEffect(() => {
      setRandomLikesGen(Math.floor(Math.random()*10000));
      setRandomViewsGen(String((Math.floor(Math.random()*10000)/1000).toFixed(1)+'K'))
    }, [])
    

  return (
    <div className="flex justify-center items-center flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flex justify-center items-center group relative"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="rounded-2xl w-100 h-60 object-cover"
          alt="Project Image"
        />
        <div className="hidden group-hover:flex  justify-end items-end w-full h-1/3 bg-gradient-to-b from-transparent to-black/50 rounded-b-2xl gap-2 absolute bottom-0 right-0 font-semibold text-lg text-white p-4">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="flex justify-between items-center w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`profile/${userId}`}>
          <div className="flex justify-center items-center gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="Profile Image"
            />
            <p>{name}</p>
          </div>
        </Link>
        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-2">
            <Image src="/hearth.svg" width={13} height={12} alt="Like" />
            <p className="text-sm">{randomLikesGen}</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Image src="/eye.svg" width={13} height={12} alt="Views" />
            <p className="text-sm">{randomViewsGen}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
