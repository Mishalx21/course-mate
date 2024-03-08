import OracleDB from 'oracledb';

export async function POST(request){
    const connection = await OracleDB.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });
   
    const body =await request.json();
    const student_id = body.student_id;
    const course_id = body.course_id;
    const comment = body.comment;
    const rating = body.rating;
    console.log("student id",student_id);
    const result = await connection.execute(`DECLARE
BEGIN
ADD_COMMENT (:course_id,:student_id,:rating,:comment);
END;
`,
    {
        student_id: student_id,
        course_id: course_id,
        comment: comment,
        rating: rating
    },{outFormat: OracleDB.OUT_FORMAT_OBJECT});
    await connection.commit();
    //const cart_id=result.outBinds.cart_id;
    await connection.close();

    let message='successfully added comment and rating to course';
    
   
    return Response.json({ message:message});
}