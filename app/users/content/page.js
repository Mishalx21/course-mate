"use client";
import React, { use, useEffect, useState } from "react";

import NavBar from "@/app/components/NavBar";
import { useRouter } from "next/router";
//import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import CommentBox from "@/app/components/comment";

import { useSearchParams } from "next/navigation";
export default function Course() {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [moduleId, setModuleId] = useState([]);
  const [moduleContent, setModuleContent] = useState([]);
  const [clickedModule, setclickedModule] = useState("1");
  const [contentClicked, setContentClicked] = useState(false);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const student_id = secureLocalStorage.getItem("u_id");
  
  const searchParams = useSearchParams();
  const courseId = searchParams.get("course_id");
  console.log(" use search Course ID:", courseId);


  useEffect(() => {
    const fetchCourseModules = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get_module", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ course_id: courseId }),
        });
        const json = await response.json();
        console.log("Course Modules:", json);
        console.log("Course Modules test 1:", json[1]);

        setModuleId(json);

        //console.log("Course Modules test -2:", moduleId);
      } catch (error) {
        console.error("Error fetching course modules:", error);
      }
    };
    fetchCourseModules(); // Fetch data initially
  }, []);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  useEffect(() => {
    console.log("Module ID:", moduleId);
    const fetchModuleContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/get_module_content",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ module_id: clickedModule }),
          }
        );
        const json = await response.json();
        console.log("Module Content here:", json);
        setModuleContent(json);
      } catch (error) {
        console.error("Error fetching module content:", error);
      }
    };
    fetchModuleContent(); // Fetch data initially
  }, [clickedModule]);

  const toggleSubMenu = () => {
    setSubmenuOpen(!submenuOpen);
    setContentClicked(false);
    setVideoPlayed(false);
    //setShowCommentBox(false);
    //setSelectedMenuItem(""); // Reset selectedMenuItem when closing the overview
  };

  const handleMenuItemClick = (menuItem) => {
    //setSelectedMenuItem(menuItem);
    //setContentClicked(true);

    // setShowCommentBox(false);
    if (menuItem === "Title 1") {
      // Open video in new page
      router.push("video");
    }
  };
  const handleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
    setContentClicked(false);
    setSelectedMenuItem(false);
  };

  const handleVideoPlayed = ({ menuItem, videourl }) => {
    //setSelectedMenuItem(menuItem);

    // Open video in new page
    //let url = "/Python.mp4";
    setContentClicked(false);

    secureLocalStorage.setItem("videoUrl", videourl);
    console.log("Video URL:", secureLocalStorage.getItem("videoUrl"));
    let url = secureLocalStorage.getItem("videoUrl");

    url.replace("/\r\n/g", "\n");

    setVideoUrl(url);
    // router.push("video");
  };
  const handleModuleClick = (module) => {
    setContentClicked(true);
  };

  ///////////
  const handleContentClick = () => {
    //setSelectedContent(content);
    //setVideoPlayed(true); // Show video box
    setVideoPlayed(true);
    setContentClicked(true);
    setShowCommentBox(false);
  };

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
                  >
                    <svg
                      class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3">Dashboard</span>
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={toggleSubMenu}
                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      Overview
                    </span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {submenuOpen && (
                    <div className="pl-4">
                      {moduleId.map((module, index) => (
                        <a
                          href="#"
                          key={module[0]} // Ensure each element has a unique key
                          className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          onClick={() => {
                            handleMenuItemClick(module[1]);
                            setclickedModule(module[0]);
                            handleModuleClick();
                          }}
                        >
                          Module {index + 1}: {module[1]}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    onClick={() => handleMenuItemClick("Course Title")}
                  >
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{ color: "#9aa3b1" }}
                    />
                    <button onClick={handleCommentBox}>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Review this course
                      </span>
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <div className="p-4 sm:ml-64 py-5">
            {/* Right side box with three columns */}
            {showCommentBox && <CommentBox
            student_id={student_id}
            course_id={courseId} />}
            {contentClicked && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <p className="font-semibold">Types</p>
                    {moduleContent.map((content, index) => (
                      <p key={content[index]}>{content[1]}</p>
                    ))}
                  </div>
                  <div className="col-span-1">
                    <p className="font-semibold">Content title</p>
                    {/* <Link href="video"> */}
                    {moduleContent.map((content, index) => (
                      <p
                        key={content[index]}
                        className="hover:text-blue-500 cursor-pointer"
                        onClick={() => {
                          handleVideoPlayed({
                            menuItem: "Title 1",
                            videourl: content[2],
                          });
                          handleContentClick();
                        }}
                      >
                        {content[0]}
                      </p>
                    ))}
                    {/* </Link> */}
                  </div>
                  <div className="col-span-1">
                    <p className="font-semibold">Status</p>
                    {moduleContent.map((content, index) => (
                      <p key={content[index]}>Not Started</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {videoPlayed && (
              <div>
                <div className="flex justify-center items-center">
                  <div className="rounded-lg shadow-lg overflow-hidden mt-5">
                    <video className="w-full" controls>
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
