import { getChatHistory, getSupportOrderDetails } from "@/api/consumer/order";
import { getReviewData } from "@/api/consumer/review";
import OrderSupport from "@/components/consumer/Orders/OrderSupport";

const product = {
  image: "", // Leave empty for dummy image
  title: "Netting Mykonos",
  description: "Tunic Dress",
  color: "Space Gray",
  size: "Size: S",
  status: "Opened",
  ticketNumber: "Ticket: #67-99-88",
};

const page = async (context: {
  params: { order_id: string };
  searchParams: { status: string };
}) => {
  const message = await getChatHistory(context.params.order_id);

  const product = await getSupportOrderDetails(context.params.order_id);

  return (
    <div>
      <OrderSupport
        product={product.data}
        messages={message.data}
        request_id={context.params.order_id}
      />
    </div>
  );
};
export default page;
