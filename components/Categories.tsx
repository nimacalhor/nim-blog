import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { Category } from "../lib/types";

function Categories() {
  const [categories, setCategories] = useState<Category[]>();
  useEffect(() => {
    // if (!categories) return;
    getCategories().then((res) => setCategories(res));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">categories</h3>
      {categories?.map((ctg) => (
        <Link key={ctg.name} href={`/category/${ctg.slug}`}>
          <span className="cursor=-pointer block pb-3 mb-3">{ctg.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
