'use client';
import React,{useEffect,useRef,useState} from "react";
import SearchBar from "./SearchBar";
import SearhResultList from "./SearchResultList";
import Logo from "./Logo";

const NavBar=()=>{
    const searchDivRef=useRef();
    const [results,setResults]=useState([]);
    const [allCourses,setAllCourses]=useState([]);
    const userDropdownRef=useRef();

    useEffect(()=>{
        fetch('http://localhost:3000/api')
        .then((a)=>{
            return a.json();
        }).then((json)=>
        {
            setAllCourses(json);
            console.log(json);
        });
    },[]);

    return (
        <nav  className="fixed top-0 left-0 right-0 h-16 ">
            <div  className="flex h-full p-3 space-x-5 justify-between">
                <Logo/>  
                <div className="w-2/5 md:space-y-12" ref={searchDivRef}>
            <SearchBar
        allCourses={allCourses}
        setResults={setResults}
        containerRef={searchDivRef}
        />
        <SearhResultList results={results} setResults={setResults}/>
        </div>
            </div>
        </nav>
        
    )
}

export default NavBar;