
import oracledb from 'oracledb';
import get_couse_review from '@/app/query/get_course_review';

export async function POST(request){

    
    const connection = await oracledb.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });
    
    //console.log(request.body)
    
    const body =await request.json();
    const course_id = body.id;
    //console.log(course_id);

    //console.log(course_id);
    //console.log("body",request);
    const result = await connection.execute(get_couse_review(course_id));
    await connection.close();
    
    return Response.json(result.rows);
}