import { getCategories } from "@/api/auth/categories";
import { getCountries } from "@/api/common/charities";
import RegisterationInitialCard from "@/components/auth/RegisterComponents/RegistrationInitialCard";
import { string } from "yup";

const page = async ({ searchParams }: { searchParams: { user: string } }) => {
  const merchantCategories = await getCategories("merchant");
  const allCountries = await getCountries();

  return (
    <main className="h-full">
      <RegisterationInitialCard
        countries={allCountries.data}
        merchantCategories={merchantCategories.data || []}
        searchParams={searchParams.user}
      />
    </main>
  );
};

export default page;
