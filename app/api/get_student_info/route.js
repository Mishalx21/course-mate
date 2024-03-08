
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
    const student_id = body.student_id;
    console.log("in get student info",student_id);
    const result = await connection.execute(`SELECT 
    STUDENT_ID,
    NAME,
    EMAIL,
    PASSWORD,
    GENDER,
    TO_CHAR(DATE_OF_BIRTH, 'YYYY-MM-DD') AS DATE_OF_BIRTH,
    EDUCATIONAL_STATUS 
FROM 
    STUDENT 
WHERE 
    STUDENT_ID = ${student_id}`);
    await connection.close();
    
    return Response.json(result.rows);
}