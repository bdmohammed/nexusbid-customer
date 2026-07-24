import CategoriesGrid from "@/components/categories/directory/CategoriesGrid";
import CategoriesCTA from "@/components/categories/directory/CategoriesCTA";

export const metadata = {
  title: "Categories | RFPNexa",
};

export default function CategoriesPage() {
  return (
    <>
      <CategoriesGrid />
      <CategoriesCTA />
    </>
  );
}
