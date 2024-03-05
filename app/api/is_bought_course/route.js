import OracleDB from 'oracledb';
export async function POST(request){
    const connection = await OracleDB.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });
   
    const body =await request.json();
    const student_id = body.studentId;
    const course_id = body.courseId;   

    const result = await connection.execute(`SELECT  COUNT(*) COUNT
    FROM TRANSACTION
    WHERE STUDENT_ID =${student_id} AND COURSE_ID=${course_id}
`);
    await connection.close();
    
    return Response.json(result.rows);
}