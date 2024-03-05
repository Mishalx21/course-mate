'use client';
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Video() {
  let url = secureLocalStorage.getItem("videoUrl");
  console.log("in video page");
 

  url.replace("/\r\n/g", "\n");

  return (
    <div>
      <video width="320" height="240" controls>
        <source src={`${url}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
