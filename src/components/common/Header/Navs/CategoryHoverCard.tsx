// import React from "react";
// import { HoverAnimationDiv } from "../../AnimatedDiv";
// import { ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { IAllCategoryResponse } from "@/api/common/types";
// const HoverCardItemHeader = ({ label }: { label: string }) => {
//   return (
//     <HoverAnimationDiv>
//       <span className="font-semibold text-merchant_text_color_blue">
//         {label}
//       </span>
//       <ChevronRight className={`h-5 w-5 text-merchant_text_color_blue`} />
//     </HoverAnimationDiv>
//   );
// };

// const HoverCardItem = ({ label }: { label: string }) => {
//   return (
//     <HoverAnimationDiv>
//       <span className="font-semibold">{label}</span>
//     </HoverAnimationDiv>
//   );
// };
// const CategoryHoverCard: React.FC<{
//   className?: string;
//   categories: IAllCategoryResponse;
// }> = async ({ className, categories }) => {
//   return (
//     <div className={`w-full max-w-[700px]  ${className}`}>
//       <div className="h-[18px] bg-transparent"></div>
//       <div className="grid grid-cols-3 gap-4">
//         {categories.data &&
//           categories.data.map((parentCat) => (
//             <div key={parentCat.id} className="min-w-[200px]">
//               <Link
//                 href={`/shop?category=${encodeURIComponent(JSON.stringify({ [parentCat.id]: true }))}`}
//               >
//                 <HoverCardItemHeader label={parentCat.name} />
//               </Link>
//               <ul className="list-disc pl-4">
//                 {parentCat.children.slice(0, 4).map((subCat) => (
//                   <li key={subCat.id} className="list-none">
//                     <Link
//                       href={`/shop?category=${encodeURIComponent(JSON.stringify({ [String(parentCat.id)]: { [String(subCat.id)]: true } }))}`}
//                       className="font-thin hover:underline"
//                     >
//                       {subCat.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryHoverCard;


import React from "react";
import { HoverAnimationDiv } from "../../AnimatedDiv";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { IAllCategoryResponse } from "@/api/common/types";

const HoverCardItemHeader = ({ label }: { label: string }) => {
  return (
    <HoverAnimationDiv>
      <span className="font-semibold text-merchant_text_color_blue">
        {label}
      </span>
      <ChevronRight className={`h-5 w-5 text-merchant_text_color_blue`} />
    </HoverAnimationDiv>
  );
};

const HoverCardItem = ({ label }: { label: string }) => {
  return (
    <HoverAnimationDiv>
      <span className="font-semibold">{label}</span>
    </HoverAnimationDiv>
  );
};

const CategoryHoverCard: React.FC<{
  className?: string;
  categories: IAllCategoryResponse;
}> = ({ className, categories }) => {
  // Filter categories to include only those with name "Products"
  const productCategories = categories.data.filter(category => category.name === "Products");

  return (
    <div className={`w-full max-w-[700px] ${className}`}>
      <div className="h-[18px] bg-transparent"></div>
      <div className="grid grid-cols-1 gap-4">
        {productCategories.map((parentCat) => (
          <div key={parentCat.id} className="max-w-[200px]">
            <Link
              href={`/shop?category=${encodeURIComponent(JSON.stringify({ [parentCat.id]: true }))}`}
            >
              <HoverCardItemHeader label={parentCat.name} />
            </Link>
            <ul className="list-disc pl-4">
              {parentCat.children.slice(0, 4).map((subCat) => (
                <li key={subCat.id} className="list-none">
                  <Link
                    href={`/shop?category=${encodeURIComponent(JSON.stringify({ [String(parentCat.id)]: { [String(subCat.id)]: true } }))}`}
                    className="font-thin hover:underline"
                  >
                    {subCat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHoverCard;
