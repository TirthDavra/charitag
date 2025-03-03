import ProductCard from "@/components/common/ProductCard";
import Description from "@/components/common/NavbarLinkPages/AllDeals/Description";
import Slider, {
  SliderNew,
} from "@/components/common/NavbarLinkPages/AllDeals/Slider";
import AddToWishListModal from "@/components/common/NavbarLinkPages/AllDeals/AddToWishListModal";
import CreateNewWishListModal from "@/components/common/NavbarLinkPages/AllDeals/CreateNewWishListModal";
import ShowCartModal from "@/components/consumer/Cart/ShowCartModal";
// import { getProduct } from "@/api/common/deals";
import Animate from "@/components/common/Animate";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { getTopProduct } from "@/api/common/products";
// import { IProduct } from "@/api/common/types";
interface SearchParams {
  searchParams: Record<string, string> | null | undefined;
}

const allDeals = async ({ searchParams }: SearchParams) => {
  const data = await getTopProduct();
  const product = data.data;

  const show = searchParams?.modal;
  const wishmodal = searchParams?.wishmodal;
  const wishcreate = searchParams?.wishcreate;

  return (
    <Animate>
      <main className="container mx-auto my-5 mt-11 w-full overflow-hidden">
        <div className="flex flex-col items-center md:flex-row md:gap-6 lg:gap-[138px]">
          <Description
            className=" lg:w-[40%]"
            classNameHeading="!text-[45px] leading-[34px] !md:text-[45px] md:leading-[56px] mt-5 md:mt-0 mb-5 md:mb-0"
            classNamePara="mb-10 md:mb-0 md:mt-5 text-[#87878d] font-medium "
          />
          <SliderNew
            className={""}
            showAddToCart={false}
            showHeart={true}
            allDeals={product}
            deal={true}
          />
        </div>
        {/* <div className="mt-8 sm:mt-14">
          <h1 className="text-3xl font-bold">
            Deals
            <span className="text-md font-normal">(6)</span>
          </h1>
          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div> */}

        <div className="mt-[77px] hidden items-center justify-center md:flex">
          <ButtonPrimary
            label={"Load More Deals"}
            className="h-[50px] w-[166px] rounded-full px-[25px] py-[15px]"
          />
        </div>
        {/* {show && <ShowCartModal product={product} />} */}
      </main>
    </Animate>
  );
};

export default allDeals;
