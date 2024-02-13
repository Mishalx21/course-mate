import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo= ()=>{
    return(
        <div className='absolute'>
            <Link href="/">
                <Image src='/logo.png' width={200} height={200} alt='logo ' priority={true}/>
            </Link>
        </div>
    );
};

export default Logo;