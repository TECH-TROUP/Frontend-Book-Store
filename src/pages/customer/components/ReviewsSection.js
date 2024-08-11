import React, { useEffect, useState } from "react";
import { icons } from "../../../assets/icons/IconData";
import { useReviewContext } from "../../../context/reviewContext";
import Snackbar from "../../../components/Snackbar";
import ReviewTitle from "./ReviewTitle";

export default function ReviewsSection({ bookId, averageRating, reviewCount }) {
  // State
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  //   context
  const { createReview, getAllReviewsOfBook } = useReviewContext();

  //   Initialize Data
  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, []);

  const fetchReviews = async () => {
    const response = await getAllReviewsOfBook(bookId);
    setReviews(response);
    setLoading(false);
  };

  // Handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Handle comment change
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Submit review
  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") {
      showSnackbar("Please provide a rating and a comment.", "bg-blue-700");
      return;
    }

    setSubmitting(true);

    try {
      await createReview(bookId, rating, comment);
      await fetchReviews();
      showSnackbar("Review submitted successfully.", "bg-green-700");
      setRating(0);
      setComment("");
    } catch (error) {
      showSnackbar(
        "Failed to submit review. Please try again.",
        "bg-yellow-700"
      );
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const showSnackbar = (message, bgColor) => {
    setSnackbarMessage({ message, bgColor });
    setIsSnackbarVisible(true);
  };

  const renderStars = (rating, isHoverable = false) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      return (
        <div
          key={index}
          className={`cursor-pointer ${
            isHoverable ? "" : "pointer-events-none"
          }`}
          onMouseEnter={
            isHoverable ? () => setHoverRating(starValue) : undefined
          }
          onMouseLeave={isHoverable ? () => setHoverRating(0) : undefined}
          onClick={
            isHoverable ? () => handleRatingChange(starValue) : undefined
          }
        >
          {hoverRating >= starValue || rating >= starValue
            ? icons.star_filled
            : icons.star}
        </div>
      );
    });
  };

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div className="flex w-full space-x-4 items-start">
          <div className="w-1/4 bg-blue-800/50 rounded-lg flex flex-col items-start py-2 px-4">
            <div className="text-lg font-bold">Customer Reviews</div>
            <div className="flex items-center space-x-2 mt-2">
              {renderStars(averageRating, false)}
              <span className="text-sm">{averageRating.toFixed(1)}</span>
            </div>
            <div className="text-xl text-left">{reviewCount} Reviews</div>
          </div>
          <div className="w-3/4 flex flex-col items-start max-h-[calc(100vh-150px)] space-y-4">
            <div className="flex w-full space-x-4 items-center">
              <textarea
                rows={3}
                placeholder="Write your review"
                value={comment}
                onChange={handleCommentChange}
                className="outline-none p-2 rounded-lg text-black w-full"
              />
              <div className="flex space-x-2 bg-white text-black rounded-lg p-2">
                {renderStars(rating, true)}
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-600 rounded-lg py-2 px-4 hover:bg-green-800 transition-color duration-300"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
            <div className=" flex flex-col space-y-4 flex-1 overflow-y-auto w-full">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex flex-col space-y-2 items-start bg-blue-800 rounded-lg px-4 py-2 w-full"
                >
                  <ReviewTitle review={review} />
                  <div className="text-sm bg-blue-600/50 rounded-lg px-4 py-2 text-left">
                    {review.comment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Snackbar
        data={snackbarMessage}
        isVisible={isSnackbarVisible}
        onClose={() => setIsSnackbarVisible(false)}
      />
    </>
  );
}
