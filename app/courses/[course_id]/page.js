"use client";
import NavBar from "@/app/components/NavBar";
import Review from "@/app/components/Review";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Course({ params }) {
  const [course, setCourse] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    async function init() {
      const response = await fetch(
        "http://localhost:3000/api/selected_course",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: params.course_id }),
        }
      );

      const json = await response.json();
      setCourse(json[0]);

      const response2 = await fetch(
        "http://localhost:3000/api/selected_course_review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: params.course_id }),
        }
      );

      const json2 = await response2.json();
      setReviews(json2);

      const response3 = await fetch(
        "http://localhost:3000/api/course_instructor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: params.course_id }),
        }
      );

      const json3 = await response3.json();
      setInstructor(json3);

      console.log(json);
    }
    init();
  }, []);

  const renderRatingStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <>
  <div>
    <NavBar />
  </div>
  <div className="flex w-full h-screen mt-20">
    <div className="w-3/5 p-8 ml-20">
      <h1 className="text-3xl font-bold mb-4">{course[1]}</h1>
      {instructor.map((instructor) => (
        <h2 key={instructor[0]} className="text-xl mb-2">
          Instructor: {instructor[0]}
        </h2>
      ))}
      <h2 className="text-xl mb-2">Description: {course[2]}</h2>
      <h2 className="text-xl mb-2">
        Overall Rating: {renderRatingStars(course[3])}
      </h2>
      <div className="review w-10/12 ">
        <h2 className="text-2xl font-semibold mb-4 ">Reviews</h2>
        {reviews.map((review) => (
          <Review
            key={review[0]}
            reviewerName={review[0]}
            reviewDate={review[1]}
            reviewComment={review[3]}
            rating={review[2]}
          />
        ))}
      </div>
    </div>
    <div className="w-2/10 p-8 mt-10 ">
      <div className="flex flex-col items-center border border-gray-300 rounded-lg">
        <div className="mb-4">
          <img src="/image.gif" alt="Course Image" className="img" />
        </div>
        <div className="mb-4">
          <h3 className="text-xl">Price: $99.99</h3>
        </div>
        <div className="border-t border-gray-300 w-full p-4 flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Add to Cart
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</>


  );
}
