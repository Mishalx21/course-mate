import React from "react";
const SearhResultList=({results,setResults})=>{
    return(
        <div className="relative left-[308px] w-[480px] bg-white flex-col shadow-md max-h-80 overflow-auto">
            {
                results.map((course)=>{
                    

                   return (
                    <button key={course[0]} onClick={()=>setResults([])}>
                        <a key={course[0]} href={`/courses/${course[0]}`}>
                            <div key={course[0]} className="py-5 px-2 hover:bg-zinc-300 text-sky-600">
                                {course[1] }
                            </div>
                            </a>
                    </button>
                    
                   )

            })
            }
        </div>
    )
}
export default SearhResultList;

