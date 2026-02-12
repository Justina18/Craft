"use client";

import FeedbackWidget from './feedback-widget'

const FeedbackPage = () => {
  const handleSubmit = (data: { rating: string; feedback: string }) => {
    console.log("Feedback submitted:", data);
    alert(`Thank you for your feedback!\nRating: ${data.rating}\nFeedback: ${data.feedback}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#fff] flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-black mb-4">Feedback Widget</h1>
        <p className="text-gray-400 text-lg">Click an emoji to expand and share your thoughts</p>
      </div>

      <FeedbackWidget
        onSubmit={handleSubmit}
        label="How was your experience?"
        placeholder="Tell us what you think... (Markdown supported)"
      />
    </div>
  );
};

export default FeedbackPage;