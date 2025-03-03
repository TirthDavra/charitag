import { getSingleOrderDetails } from "@/api/consumer/order";
import SingleOrderDetails from "@/components/consumer/Orders/SingleOrderDetails";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingleOrder = async ({ params }: { params: { order_id: string } }) => {
  const data = await getSingleOrderDetails(params.order_id);

  if (data.error) {
    return (
      <div className="flex h-80 flex-col items-center justify-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-400">
          <FontAwesomeIcon icon={faCartShopping} className="text-8xl" />
        </h1>
        <p className="text-2xl text-gray-400">No order found</p>
      </div>
    );
  }

  return (
    <div>
      <SingleOrderDetails order={data.data.data} />
    </div>
  );
};
export default SingleOrder;
