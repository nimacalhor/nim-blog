import React, { useState, useRef, useEffect } from "react";
import { Comment, PostDetailType } from "../lib/types";
import parse from "html-react-parser";
import moment from "moment";
import { getComments } from "../services";

function Comments({ slug }: { slug: PostDetailType["slug"] }) {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    getComments(slug).then((res) => {
      console.log(res);
      setComments(res);
    });
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((cmt) => (
            <div
              className="border-b border-gray-100 mb-4 pb-4"
              key={cmt.createdAt}
            >
              <p className="mb-4 ">
                <span className="font-semibold">{cmt.name}</span> on{" "}
                {moment(cmt.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="white-space-pre-line text-gray-600 w-full">
                {parse(cmt.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Comments;
