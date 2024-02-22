"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import SearhResultList from "./SearchResultList";
import Logo from "./Logo";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Link from "next/link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Image from "next/image";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const UserNavBar = ({ user_info }) => {
  const searchDivRef = useRef();
  const [results, setResults] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const userDropdownRef = useRef();
  //const [user_info, setUserInfo] = useState([]);

  const test = user_info;
  const moreTest = { ...user_info[0] };

  console.log("User id testing:", test);
  console.log("User id testing:", test[0]);
  console.log("More User id testing:", moreTest);
  console.log("More User id testing:", moreTest[1]);

  useEffect(() => {
    // console.log("User id rrrr:", user_info);
    fetch("http://localhost:3000/api")
      .then((a) => {
        return a.json();
      })
      .then((json) => {
        setAllCourses(json);
        console.log(json);
      });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 ">
      <div className="flex h-full p-3 space-x-5 justify-between">
      <div className='absolute'>
            <Link href={`/user/${moreTest[0]}`}>
                <Image src='/logo.png' width={200} height={200} alt='logo ' priority={true}/>
            </Link>
        </div>
        <div className="w-2/5 md:space-y-12" ref={searchDivRef}>
          <SearchBar
            allCourses={allCourses}
            setResults={setResults}
            containerRef={searchDivRef}
          />
          <SearhResultList results={results} setResults={setResults} />
        </div>
        <div>
         
          <Button
          variant="contained"
          sx={{
            backgroundColor: "#3377ff",
            color: "#ffffff",
            marginRight: "10px",
            marginTop: "5px",
          }}>
            <ShoppingCartIcon color="primary" />

          </Button>

          <Link href={`/user/${moreTest[0]}/userUpdate`} style={{ textDecoration: "none" }}> 
          <Chip
            icon={<AccountCircleOutlinedIcon />}
            label={moreTest[1]}
            clickable
            size="large"
            color="primary"
            sx={{ marginTop: "5px" }}
          />
          </Link>
          {/* </Button>  */}
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
