"use client";
import UserNavBar from "@/app/components/userNavBar";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Course_Card_New from "@/app/components/course_card_test";
import secureLocalStorage from "react-secure-storage";
import {useRouter} from "next/navigation";

export default function Course({ params }) {
  const router = useRouter();
  const [user_info, setUserInfo] = useState([]);
  const [topRatedCourses, setTopRatedCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUserId = secureLocalStorage.getItem("u_id");
    // if (!loggedInUserId) {
    //   // User is not logged in, redirect to login page
    //   router.push("/login");
    //   return;
    // }

    // // Check if logged in user ID matches the user ID in the URL
    // if (loggedInUserId !== params.user_id) {
    //   // Logged in user does not match the requested user ID, redirect to unauthorized page or home page
    //   router.push("http://localhost:3000");
    //   return;
    // }

    async function getUserInfo() {
      console.log("User id:", params.user_id);
      const res = await fetch("http://localhost:3000/api/user_Info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.user_id }),
      });

      const json = await res.json();

      setUserInfo(json);
      console.log("User info de :", json);
      console.log("json user info:", json[0][0]);
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/popular_course")
      .then((a) => {
        return a.json();
      })
      .then((data) => {
        setPopularCourses(data);
        console.log(data);
      });
  }, [popularCourses]);

  const moreTest = { ...user_info[0] };

  // Render loading indicator while fetching user info
  if (user_info.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserNavBar user_info={user_info} />
      <div className="children-wrapper">
        <Container>
          <Typography variant="h4" gutterBottom>
            Let's start learning, {moreTest[1]}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Top Rated Courses
          </Typography>
          <Grid container spacing={3}>
            {popularCourses.map((course) => (
              <Course_Card_New
                key={course[0]}
                course_id={course[0]}
                course_name={course[1]}
                course_description={course[2]}
                course_price={course[3]}
                course_image={course[4]}
              />
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}