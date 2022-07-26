import Image from "next/image";
import React from "react";
import { PostDetailType } from "../lib/types";

function Author({ author }: { author: PostDetailType["author"] }) {
  const { bio, id, name, photo } = author;
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        {photo?.url && (
          <Image
            unoptimized
            alt={name}
            height={100}
            width={100}
            src={photo.url}
            className="align-middle rounded-full"
          />
        )}
      </div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">{name}</h3>
      <p className="text-white text-lg">{bio}</p>
    </div>
  );
}

export default Author;
