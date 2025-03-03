import { auth } from "auth";

import Cart from "@/components/consumer/Cart";
import { getCharities } from "@/api/charity/charity";
import { getDonationsCharity } from "@/api/consumer/my-donations";
import { getCart } from "@/api/user/cart";
const ConsumerCart = async () => {
  const session = await auth();
  const charities = await getCharities({ is_only_name: true });

  const initCharity = await getDonationsCharity();
  // const init_cart = await getCart();

  return (
    <Cart
      session={session}
      charities={charities.data.data}
      // init_cart={init_cart}
      initCharity={
        initCharity.data?.length > 0
          ? initCharity.data.map((item) => ({
              label: item.charity_name,
              value: item.id.toString(),
            }))
          : []
      }
    />
  );
};

export default ConsumerCart;
