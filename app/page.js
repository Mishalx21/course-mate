'use client';
import React, { useEffect, useState } from "react";
import CourseCardGrid from "./components/coursecardgrid";
async function getCourse()
{
  const response = await fetch('http://localhost:3000/api');
  const data = await response.json();
  return data;
}

export default  function Home() {
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
  useEffect(()=>{
    fetch('http://localhost:3000/api/popular_course')
    .then((a)=>{
      return a.json();
    }).then((data) => {
      //console.log(data);
      setPopularCourses(data);
      //console.log('here it is2');
      console.log(data);
      //setLoading(false);
    })

  },[])




  return (
    <main>
      
      <div>
      
        
      </div>
      <div className="p-10 ">
        <CourseCardGrid courses={popularCourses} />

      </div>
    </main>
  );
}
