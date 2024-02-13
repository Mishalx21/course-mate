import OracleDB from 'oracledb';
//import oracledb from 'oracledb';
import get_course_instructor from '@/app/query/get_course_instructor';

export async function POST(request){
    const connection = await OracleDB.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });
   
    const body =await request.json();
    const course_id = body.id;

    const result = await connection.execute(get_course_instructor(course_id));
    await connection.close();
    
    return Response.json(result.rows);
}