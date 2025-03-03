import { VariationFinal } from "@/api/common/productTypes";
import { getProductBySlug } from "@/api/common/products";
import Error404 from "@/app/(home)/404/page";
import { IVariationFinal } from "@/app/merchant/products/manage/initVal";
import FailedToLoadPage from "@/components/FailedToLoad";
import DealProduct from "@/components/common/product";
import CartProvider from "@/components/context/CartContext";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { preview: string; page: string };
}) => {
  const product = await getProductBySlug({
    slug: params.slug,
    preview: searchParams?.preview || "",
  });
  if (product.statusCode === 404) {
    return (
      <div>
        <Error404 />
      </div>
    );
  }
  if (product.error || !product.data.status) {
    return <FailedToLoadPage />;
  }

  return (
    <div className="flex-1">
      <DealProduct
        product={{
          ...product.data.data,
          variations: product.data.data.variations.reduce(
            (acc: VariationFinal, variation) => {
              acc[variation.hashcode] = variation;
              return acc;
            },
            {} as VariationFinal,
          ),
        }}
        page={searchParams?.page}
      />
    </div>
  );
};

export default Page;
