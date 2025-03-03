import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full  flex-col items-center justify-center ">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">Not Found</h2>
      <p className="mb-8 text-lg text-gray-600">
        Could not find the requested resource
      </p>
      <Link
        href="/"
        className="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600"
      >
        Return Home
      </Link>
    </div>
  );
}
