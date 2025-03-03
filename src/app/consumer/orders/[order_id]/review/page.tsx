import { getReviewData } from "@/api/consumer/review";
import SingleReview from "@/components/consumer/Orders/SingleReview";

const Review = async ({ params }: { params: { order_id: string } }) => {
  const data = await getReviewData({ slug: params.order_id });
  return (
    <div>
      <SingleReview data={data?.data || {}} />
    </div>
  );
};
export default Review;
