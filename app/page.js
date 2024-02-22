"use client";
import React, { useEffect, useState } from "react";
import CourseCardGrid from "./components/coursecardgrid";
import Course_Card_New from "./components/course_card_test";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import NavBar from "./components/NavBar";

async function getCourse() {
  const response = await fetch("http://localhost:3000/api");
  const data = await response.json();
  return data;
}

export default function Home() {
  const [topRatedCourses, setTopRatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:3000/api').then((a)=>{
  //     return a.json();
  // }).then((data) => {
  //       console.log(data);
  //       setTopRatedCourses(data);
  //       console.log('here it is2');
  //       console.log(data);
  //       //setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setError('Error fetching data. Please try again later.');
  //       //setLoading(false);
  //     });
  // }, []);

  // const handleSearch = (searchText) => {
  //   const filterd=topRatedCourses.filter((course) =>
  //     course[1].toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setFilteredCourses(filtered);
  // };
  useEffect(() => {
    fetch("http://localhost:3000/api/popular_course")
      .then((a) => {
        return a.json();
      })
      .then((data) => {
        //console.log(data);
        setPopularCourses(data);
        //console.log('here it is2');
        console.log(data);
        //setLoading(false);
      });
  }, []);

  

  return (
    <main>
      <NavBar/>
      <div>
        
      </div>
      <div className="children-wrapper">
        
        <Container>
          <Typography variant="h4" gutterBottom>
            Top Rated Courses
          </Typography>
          <Grid container spacing={3}>
            {popularCourses.map((course) => (
              <Course_Card_New
                key={course[0]}
                course_id={course[0]}
                course_name={course[1]}
                course_rating={course[3]}
                course_price={course[2]}
                buy_count={course[4]}
                //className="mr-5" // Add margin between cards
              />
            ))}
          </Grid>
        </Container>
      </div>
    </main>
  );
}
