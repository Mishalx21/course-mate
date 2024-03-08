"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import SearhResultList from "./SearchResultList";
import Logo from "./Logo";
import Button from "@mui/material/Button";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import  Chip  from "@mui/material/Chip";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const NavBar = () => {
  const searchDivRef = useRef();
  const [results, setResults] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const userDropdownRef = useRef();
  const [isLoggedIn,setisLoggedIn]=useState(false);

  useEffect(() => {
    if (secureLocalStorage.getItem("u_id")) {
      setisLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((a) => {
        return a.json();
      })
      .then((json) => {
        setAllCourses(json);
        console.log(json);
      });
  }, []);
  
    const user=secureLocalStorage.getItem("u_name");
    const user_id=secureLocalStorage.getItem("u_id");
  

  return (
    
    <nav className="fixed top-0 left-0 right-0 h-16 ">
      <div className="flex h-full p-3 space-x-5 justify-between">
        <Logo />
        <div className="w-2/5 md:space-y-12" ref={searchDivRef}>
          <SearchBar
            allCourses={allCourses}
            setResults={setResults}
            containerRef={searchDivRef}
          />
          <SearhResultList results={results} setResults={setResults} />
        </div>
        {!isLoggedIn&&
        <div>
           <Link href="/login"> 
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3377ff",
              color: "#ffffff",
              marginRight: "10px",
              marginTop: "5px",
            }}
          >
            Log In
          </Button>
          </Link>
          <Link href="/signup" >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3377ff",
              color: "#ffffff",
              marginTop: "5px",
            }}
          >
            Sign Up
          </Button>
          </Link>
        </div>}
        {isLoggedIn&&
        <div>
         <Link href={"/users/shopping_cart"} >
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
        </Link>

        <Link href={`/users/dashboard`} style={{ textDecoration: "none" }}> 
        <Chip
          icon={<AccountCircleOutlinedIcon />}
          label={user}
          clickable
          size="large"
          color="primary"
          sx={{ marginTop: "5px" }}
        />
        </Link>
        {/* </Button>  */}
      </div>}
      </div>
    </nav>
  );
};

export default NavBar;
