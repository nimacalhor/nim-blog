import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Category } from "../lib/types";
import { getCategories } from "../services";


function Header() {
  const [categories, setCategories] = useState<Category[]>();
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              nim blog
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories?.map((ctg, i) => (
            <Link key={ctg.slug} href={`/category/${ctg.slug}`} passHref>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {ctg.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
