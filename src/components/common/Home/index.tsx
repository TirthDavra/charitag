import img from "@images/homepage-video-img.jpg";
import logo from "@images/charitag_logo_white.svg";
import charitagLogo from "@images/bluish_logo.svg";
import Image from "next/image";
import ButtonPrimary from "../ButtonPrimary";
import CharitagBenefits from "./CharitagBenefits";
import DealSlider from "./DealSlider";
import TopDeal from "./TopDeal";
import Charities from "./Charities";
import ChromeModal from "./ChromeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import TopProducts from "./TopProducts";
import { getMerchantProductCategories } from "@/api/common/products";
import Link from "next/link";

const Home = async ({
  searchParams,
}: {
  searchParams: {
    per_page: string;
    charity_id: string;
    prev_campaign: string;
    sort_field?: string;
    country_id?: string;
    page: number;
  };
}) => {
  const categories = await getMerchantProductCategories();

  return (
    <div className="">
      <div className="absolute right-[3px] top-0 h-[32vh] w-[28vw] rounded bg-gradient-to-b from-[#f9fafe] to-[#ced3f9]/10" />
      <div className="bg-gradient-to-r from-[#f9fafe] from-[70%]  to-[#ced3f9]">
        <div className="container">
          <div className="relative top-0 grid h-[700px] grid-cols-1 pt-[170px] md:h-[900px] lg:h-[500px] lg:grid-cols-2  lg:gap-12 lg:pt-[200px] xl:h-[600px] ">
            <div className="lg:max-w-[597px]">
              <span className="text-[45px] font-bold leading-[45px] text-[#2F2F36] lg:text-7xl">
                Lorem ipsum dolor sit amet consectetur
              </span>
              <div className="mt-3">
                <span className="text-[#6e6f75] md:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus aliquam fugiat est error ad.
                </span>
              </div>
              {/* <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 "> */}
              <div className="mt-6 flex flex-col gap-[15px]  max-lg:mb-8 lg:flex-row">
                <div className="flex  justify-center">
                  <ButtonPrimary
                    label={`How it Works`}
                    logo={logo}
                    classNameLogo="w-[25px] h-[25px]"
                    className="flex !h-[50px] w-full justify-center gap-4 rounded-full px-0 py-3 md:h-[50px] md:gap-2 lg:!w-[169px] lg:py-[13px]"
                  />
                </div>
                <div className="flex w-full items-center justify-center lg:justify-start">
                  <Link href={"/register"}>
                    <ButtonPrimary
                      label="Join Charitag Today"
                      classNameLabel="text-blue-500"
                      className={
                        "bg-gradient-to-r from-transparent to-transparent pr-2 !shadow-none"
                      }
                    />
                  </Link>
                  <div className="flex items-center text-blue-600 ">
                    <span className="-mr-[3px] text-[30px]">·</span>
                    <span className="text-[30px]">·</span>
                    <span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-[10px] aspect-[4/3]">
              <div className="z-5">
                <div className="">
                  <Image
                    src={img}
                    alt=""
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-[30px] lg:w-[572px] "
                    priority={true}
                  />
                  {/* <img
                    src="http://localhost:3000/images/homepage-video-img.jpg"
                    className="aspect-auto rounded-[30px] lg:h-[460px] lg:w-[572px] "
                    alt=""
                  /> */}
                  <ButtonPrimary
                    label={"Watch our video"}
                    className="absolute bottom-[15px] left-1/2 !min-h-[50px] -translate-x-1/2 rounded-full py-3 md:h-[50px] lg:bottom-[30px] lg:left-[30px] lg:translate-x-0 "
                    icon={
                      <FontAwesomeIcon
                        icon={faCirclePlay}
                        className="h-[24px]"
                      />
                    }
                  />
                </div>
              </div>
              <ChromeModal
                // onClose={handelClose}
                className={
                  "absolute bottom-[-32%] right-0 hidden max-w-[459px] rounded-2xl bg-white px-[30px] shadow-[0_6px_24px_0_rgba(57,105,224,0.15)] xl:block"
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" container">
        <div className="relative">
          <div className="absolute left-[-139px] top-[10px] z-[-5] sm:left-[-210px] sm:top-[-80px]">
            <div className="relative h-[500px] w-[300px] sm:h-[800px] sm:w-[500px]">
              <Image
                src={charitagLogo}
                alt=""
                className="object-cover"
                fill={true}
              />
              <div className="absolute hidden sm:block inset-x-0 bottom-0 h-[600px] bg-gradient-to-b from-transparent to-white"></div>
            </div>
          </div>
        </div>
        <div className="m-auto mt-40 max-w-[100%] py-0 text-center md:mt-[186px] md:text-left">
          <CharitagBenefits />

          <div className="m-auto mt-24 max-w-[100%] py-0 text-start">
            <span className="text-4xl font-bold md:text-5xl ">
              Our top deals
            </span>
            <div className="!mt-0 hidden w-full sm:block">
              <DealSlider
                productCategories={categories.data.data}
                label="deals"
              />
            </div>
          </div>
          <TopDeal />
        </div>
        <div className="m-auto mt-24 max-w-[100%] py-0">
          <span className="!mb-5 text-4xl font-bold md:text-5xl">
            Our top products
          </span>
          <div className="mb-14 hidden w-full sm:block">
            <DealSlider
              productCategories={categories.data.data}
              label="products"
            />
          </div>
          <TopProducts />
        </div>
        <div className="mt-20">
          <Charities searchParams={searchParams} />
          <div className="relative">
            <div className="absolute -z-50 max-xs:right-[-100px] max-xs:top-[-250px] md:hidden">
              <div className="relative h-[500px] w-[300px]">
                <Image
                  src={charitagLogo}
                  alt=""
                  className="object-cover"
                  fill={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
