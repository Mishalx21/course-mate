import React from "react";
import { Rating } from "@mui/material";

const CourseCard = ({ course_id, course_name, course_rating, course_price, buy_count }) => {
  return (
    <a href={`/courses/${course_id}`} className="block bg-white rounded-lg shadow-md overflow-hidden w-120 h-96 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
      <img
        src="https://img-b.udemycdn.com/course/240x135/903744_8eb2.jpg"
        alt=""
        srcSet="https://img-b.udemycdn.com/course/240x135/903744_8eb2.jpg 1x, https://img-b.udemycdn.com/course/480x270/903744_8eb2.jpg 2x"
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{course_name}</h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500">Rating: {course_rating}</span>
            <Rating name="course_rating" value={course_rating} precision={0.5} readOnly />
          </div>
          <div className="text-gray-700 font-semibold">${course_price}</div>
        </div>
      </div>
    </a>
  );
};

export default CourseCard;
