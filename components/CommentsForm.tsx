import React, { useState, useRef, useEffect } from "react";
import { PostDetailType } from "../lib/types";
import { submitComment } from "../services";

function CommentForm({ slug }: { slug: PostDetailType["slug"] }) {
  const [error, setError] = useState(false);
  const [storage, setStorage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDateEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameEl.current && nameEl.current.value)
      nameEl.current.value = window.localStorage.getItem("name") || "";
    if (emailEl.current && emailEl.current.value)
      emailEl.current.value = window.localStorage.getItem("email") || "";
  }, []);

  const handleSubmit = () => {
    setError(false);
    const comment = commentEl.current?.value;
    const name = nameEl.current?.value;
    const email = emailEl.current?.value;
    const storeData = storeDateEl.current?.checked;
    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 ">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        leave a reply
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-4 lg:grid-cols-1">
        <textarea
          name="comment"
          ref={commentEl}
          id="commentEL"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="comment"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 ">
        <input
          type="text"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="name"
          name="name"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 ">
        <input
          type="email"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="">
          <input
            type="checkbox"
            id="storeData"
            name="storeData"
            ref={storeDateEl}
          />

          <label
            htmlFor="storeDate"
            className="text-gray-500 cursor-pointer ml-2"
          >
            save my email and name for the next time
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">all fields are required</p>}
      <div className="mt-8 ">
        <button
          type="button"
          onClick={handleSubmit}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {successMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            comment submitted for review{" "}
          </span>
        )}
      </div>
    </div>
  );
}

export default CommentForm;
