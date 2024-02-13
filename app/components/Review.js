// components/Review.js

import React from 'react';

const Review = ({ reviewerName, reviewDate, reviewComment, rating }) => {
  const renderRatingStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white p-6 border rounded-md shadow-md mb-4">
      <div className="flex justify-between mb-4">
        <div className="font-bold">{reviewerName}</div>
        <div className="text-gray-500">{reviewDate}</div>
      </div>
      <div className="mb-4">{renderRatingStars()}</div>
      <div className="text-gray-700">{reviewComment}</div>
    </div>
  );
};

export default Review;
