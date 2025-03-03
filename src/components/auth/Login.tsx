"use client";
import React, { useEffect, useState } from "react";

import charitagLogo from "@images/bluish_logo.svg";

import { Field, Form, Formik } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import { USER_ROLES } from "@/lib/userRoles";
import { useCart } from "../context/CartContext";
import { validationSchemaSignIn } from "./RegisterComponents/ValiadtionSchemaForRegister";
import ButtonPrimary from "../common/ButtonPrimary";
import { connectionWithSocketServer } from "@/socket";
import { useAppDispatch } from "@/lib/Store/hooks";
import { incrementCount } from "@/lib/Store/slices/commonFeatures/notificationsSlice";
import { setUserDetails } from "@/lib/Store/slices/commonFeatures/userInfoSlice";
import { logout } from "@/lib/utils";

library.add(fab, faGoogle, faFacebook);
/**
 * Login Component
 *
 * This component handles the user login functionality, including form submission and social login options.
 *
 * @prop {Object} props - The component props.
 * @prop {string} [props.className] - An optional class name to apply custom styling.
 * @prop {Object} props.searchParams - URL search parameters.
 * @prop {string} [props.searchParams.error] - An optional error message to display if there was an issue during login.
 * @prop {Function} [props.afterLogin] - An optional callback function to execute after a successful login.
 *
 * @returns {JSX.Element} The rendered login component.
 */
const Login = ({
  className,
  searchParams,
  afterLogin,
  loginNotCheck = false,
}: {
  className?: string;
  searchParams: { error: string | undefined };
  afterLogin?: () => void;
  loginNotCheck?: boolean;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCart();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (searchParams.error) {
      toast.error(searchParams.error);
    }
  }, [searchParams]);
  useEffect(() => {
    const alreadyLoginCheck = async () => {
      const session = await getSession();
      if (session?.user?.role) {
        router.push(`/`);
      }
    };
    if (!loginNotCheck) {
      alreadyLoginCheck();
    }
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <div className="relative">
        <div className="absolute left-[-75%] top-[120px] z-[0] ">
          <div>
            <Image
              src={charitagLogo}
              alt=""
              className="object-cover"
              width={600}
              height={400}
            />
            {/* <div className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-b from-transparent to-white"></div> */}
          </div>
        </div>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchemaSignIn}
        onSubmit={async (values) => {
          setLoading(true);

          try {
            // Start the sign in process
            const result = await signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            });

            // Fetch the session
            const session = await getSession();

            // Check for any error
            if (session?.user.error) {
              toast.error(session.user.error);
              logout({
                redirect: false,
              });
              return;
            }

            dispatch(
              setUserDetails({ data: session?.user?.userDetails || null }),
            );
            // Successful sign in message
            toast.success(
              "You've successfully signed in. Enjoy your experience!",
            );

            // Connect with socket server
            session?.user?.userDetails?.id &&
              connectionWithSocketServer(session?.user?.userDetails?.id);
            // Check if the user doesn't have a complete profile and is not a consumer
            if (
              session?.user.role !== USER_ROLES.CONSUMER &&
              (session?.user.userDetails?.account_status === 2 ||
                session?.user.userDetails?.account_status === 3)
            ) {
              router.push(`/register/${session?.user?.role}`);
              return;
            }

            // Check if afterLogin function exists and user is a consumer
            if (
              afterLogin &&
              session &&
              session?.user.role === USER_ROLES.CONSUMER
            ) {
              afterLogin();
              return;
            }

            // Clear the cart for users who are not consumers
            clearCart();

            // Redirect the user based on their role and profile completion status
            router.push(
              Boolean(session?.user.userDetails?.account_status === 1)
                ? session?.user?.role !== USER_ROLES.CONSUMER
                  ? `/${session?.user?.role}/dashboard`
                  : "/"
                : "/",
            );
          } catch (error) {
            console.log("Error occurred in sign in process");
            toast.error("Some error occurred. Please try again later");
            console.log("Error in login", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ isValid, dirty }) => {
          return (
            <Form>
              <main
                className={`relative mt-[145px] flex h-[726px] max-w-[667px] flex-col gap-5 rounded-xl bg-white px-5 py-[35px] shadow-equally_distributed_bluish md:mt-[195px] md:w-[50vw] md:pb-[41px] md:pt-[26px] lg:px-24 xl:px-28 ${className}`}
              >
                <h1 className="text-center text-[34px] font-bold text-gray-800 md:text-[45px]">
                  Sign In
                </h1>
                <Field
                  component={CustomInputFieldFormik}
                  name="email"
                  placeholder="Email address"
                  type="email"
                  required
                  className="placeholder-gray"
                />
                <Field
                  component={CustomInputFieldFormik}
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
                <Link
                  href={"/forgot-password"}
                  className="mt-[-4px] text-center font-bold text-gray-700 underline lg:mt-[-10px] lg:text-left"
                >
                  Forgot your password?
                </Link>
                <button
                  type="submit"
                  className={`rounded-full bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 px-4 py-4 text-base font-bold text-white shadow-md shadow-gradient_color_1 max-md:h-[50px] ${
                    !isValid || !dirty
                      ? "disabled cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  disabled={!isValid || !dirty}
                >
                  Sign In
                </button>
                <div className="mt-6 flex items-center justify-center">
                  <span className="h-[1px] w-full bg-borders_color"></span>
                  <span className="px-5 text-xl">Or</span>
                  <span className="h-[1px] w-full bg-borders_color"></span>
                </div>
                <div className="flex flex-col gap-4">
                  <div
                    className="relative flex cursor-pointer items-center justify-center rounded-full border-[1.5px] border-black px-5 py-3 md:px-3 md:py-3"
                    onClick={async () => {
                      await signIn("google", {
                        redirect: true,
                        callbackUrl: "/",
                      });
                      // TODO set the user details into slice
                    }}
                  >
                    <FontAwesomeIcon
                      icon={["fab", "google"]}
                      className="absolute left-6 rounded-full bg-[#F74319] p-1 text-white"
                    />
                    <span className="font-bold">Sign In with Google</span>
                  </div>
                  <div
                    className="relative flex cursor-pointer items-center justify-center rounded-full border-[1.5px] border-black px-5 py-3 md:px-3 md:py-3"
                    onClick={async () => {
                      await signIn("facebook", {
                        redirect: true,
                        callbackUrl: "/",
                      });
                      // TODO set the user details into slice
                    }}
                  >
                    <FontAwesomeIcon
                      icon={["fab", "facebook"]}
                      className="absolute left-6 text-2xl text-[#3969E0]"
                    />

                    <span className="font-bold">Sign In with Facebook</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-col items-center gap-3">
                  <span className="text-lg">Don&apos;t have an account?</span>
                  <Link href="/register" className="w-full lg:w-[unset]">
                    <ButtonPrimary
                      logo={charitagLogo}
                      classNameLogo="w-[15px]"
                      label="Join Charitag today"
                      className={`flex !h-[50px] w-full justify-center gap-2 rounded-full font-bold lg:!w-[213px]`}
                    />
                  </Link>
                  {/* <Link
                    href="/register"
                    className="rounded-full bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 px-8 py-3 font-bold text-white shadow-md shadow-gradient_color_1"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-[15px]">
                        <Image
                          src={charitagLogo}
                          alt=""
                          className="w-full object-cover"
                          width={10}
                          height={10}
                        />
                      </span>
                      <span className="whitespace-nowrap">
                        Join Charitag today
                      </span>
                    </span>
                  </Link> */}
                </div>
              </main>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
