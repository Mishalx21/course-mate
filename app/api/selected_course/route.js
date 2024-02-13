
import OracleDB from 'oracledb';
import get_selected_course from '@/app/query/get_selected_course_query';
import { top_course } from '@/app/query/top_course';

export async function POST(request){
    // console.log(request);
    // console.log("req body " + request.body);

    // const body = JSON.parse(request.body)
    // console.log(body);
    
    const connection = await OracleDB.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });
    
    //console.log(request.body)
    
    const body =await request.json();
    const course_id = body.id;
    console.log(course_id);

    //console.log(course_id);
    //console.log("body",request);
    const result = await connection.execute(get_selected_course(course_id));
    await connection.close();
    
    return Response.json(result.rows);
}