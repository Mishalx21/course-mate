"use client";
import React, { use, useEffect, useState } from "react";
import Course_Card_New from "@/app/components/course_card_test";
import Grid from "@mui/material/Grid";
import NavBar from "@/app/components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import UpdateProfileForm from "@/app/components/updateprofile";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Course() {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [dashboardcliecked, setDashboardClicked] = useState(false);
    const [updateProfileClicked, setUpdateProfileClicked] = useState(false);
    const [cartClicked, setCartClicked] = useState(false);
    const [signOutClicked, setSignOutClicked] = useState(false);
    const student_id = secureLocalStorage.getItem("u_id");
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetch_buy_course() {
            const response = await fetch("http://localhost:3000/api/dashboard_courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ student_id: student_id }),
            });
            const data = await response.json();
            setCourses(data);
            console.log("dashboard courses",data);
        }
        fetch_buy_course();
    }, []);
    const handleDashboard = () => {
        setDashboardClicked(true);
        setUpdateProfileClicked(false);
        setCartClicked(false);
        setSignOutClicked(false);
        };
    const handleUpdateProfile = () => {
        setDashboardClicked(false);
        setUpdateProfileClicked(true);
        setCartClicked(false);
        setSignOutClicked(false);
        }
    const handleCart = () => {
        setDashboardClicked(false);
        setUpdateProfileClicked(false);
        setCartClicked(true);
        setSignOutClicked(false);
        }
    const handleSignOut = () => {
        setDashboardClicked(false);
        setUpdateProfileClicked(false);
        setCartClicked(false);
        setSignOutClicked(true);
        secureLocalStorage.removeItem("u_id");
        secureLocalStorage.removeItem("u_email");
        secureLocalStorage.removeItem("u_name");
        secureLocalStorage.removeItem("u_role");
        secureLocalStorage.removeItem ("u_password");   
        }

  return (
    <div>
      <NavBar />
      <div>
        <div className="mt-12 flex">
          <aside
            id="sidebar-multi-level-sidebar"
            className={`fixed top-20 left-0 z-40 w-64 h-screen transition-transform ${
              submenuOpen ? "" : "-translate-x-full sm:translate-x-0"
            }`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                <li>
                <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    onClick={() => {handleDashboard()}}
                  >
                    
                   <FontAwesomeIcon icon={faChartSimple} />
                    <span className="ms-3">Dashboard</span>
                  </a>
                </li>
                
                <li>
                  <button
                    type="button"
                    onClick={() => {handleUpdateProfile()}}
                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    <FontAwesomeIcon icon={faIdCard} />
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      Update Profile
                    </span>
                    
                  </button>
                 
                </li>
                <li>
                  <Link href="/users/shopping_cart">
                  <button
                    type="button"
                    onClick={() => {handleCart()}}
                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                     Cart
                    </span>
                    
                  </button>
                  </Link> 
                 
                </li>
                <li>
                  <Link href="/login">
                    
                    <button onClick={()=>{handleSignOut()}}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Sign Out
                      </span>
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          
        </div>
        <div className="p-4 sm:ml-64 py-5 mt-5">
            {dashboardcliecked && (
                <Grid container spacing={3}>
                {courses.map((course) => (
                    <Course_Card_New
                    key={course[0]}
                    course_id={course[0]}
                    course_name={course[1]}
                    course_rating={course[3]}
                    course_price={course[2]}
                    buy_count={course[4]}

                    />
                ))}
                </Grid>
                    
            )}
            {updateProfileClicked && (
                <div className=" w-3/5 mx-auto">
                <UpdateProfileForm />
                </div>
            )}           
          </div>
      </div>
    </div>
  );
}
