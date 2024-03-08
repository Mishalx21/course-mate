'use client';
import React, { use, useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import { useEffect } from "react";

const CommentBox = ({course_id,student_id}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  console.log("course_id:",course_id);
  console.log("student_id:",student_id);
  
  useEffect(() => {
    async function get_comment(){
      console.log("in comment section");
      const response = await fetch("http://localhost:3000/api/get_feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({student_id: student_id,course_id: course_id }),
      });
      const json = await response.json();
      console.log("comment json:",json);
      console.log(json);
      if(json.length>0){
        //console.log(json[0][0]);
        setRating(json[0][0]);
        setComment(json[0][1]);
      }
    }
    get_comment();
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };
  const handleRatingChange1 = (e) => {
    setValue(parseInt(e.target.value));
  }

  const handleSubmit = () => {
    
    // Here you can handle submitting the comment and rating
    console.log("Submitted comment:", comment);
    console.log("Submitted rating:", rating);
    async function add_comment(){
      const response = await fetch("http://localhost:3000/api/add_comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_id: student_id,course_id: course_id, comment: comment, rating: rating }),
      });
      const json = await response.json();
      console.log(json);
    }
    add_comment();

    // You can also reset the comment and rating fields if needed
    setComment("");
    setRating(0);
  };

  const renderRatingStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <label key={i} className="inline-block">
          <input
            type="radio"
            name="rating"
            value={i}
            checked={rating === i}
            onChange={handleRatingChange}
          />
          <span className={i <= rating ? "text-yellow-500" : "text-gray-300"}>
            ★
          </span>
        </label>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white p-6 border rounded-md shadow-md mb-4 max-w-md mx-auto">
     
        <div className="mb-4">
          <label htmlFor="rating" className="block font-bold mb-1">
            Rate the course:
          </label>
          <div>
          <Rating
            name="hover-feedback"
            value={rating}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
              setRating(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover); // Update hover state when hover changes
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{hover !== -1 ? hover : value}</Box>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block font-bold mb-1">
            Comment:
          </label>
          <textarea
            id="comment"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
            value={comment}
            onChange={handleCommentChange}
            required
          ></textarea>
          {/* <input
            id="comment"
            name="comment"
            type="text"
            value={comment}
            onChange={handleCommentChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
          </input> */}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      
    </div>
  );
};

export default CommentBox;
