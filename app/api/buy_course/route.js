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
    const method = body.method;
    const price = body.price;
    const account = body.account;


    const result = await connection.execute(`DECLARE
    MSG NUMBER;
    BEGIN
        BUY_COURSE(:student_id,:course_id,:method,:account,:price,:MSG);
        DBMS_OUTPUT.PUT_LINE(MSG);
    END;
`,
    {
        student_id: student_id,
        course_id: course_id,
        method: method,
        price: price,
        account: account,
        MSG: {type: OracleDB.NUMBER, dir: OracleDB.BIND_OUT}
    },{outFormat: OracleDB.OUT_FORMAT_OBJECT});
    await connection.commit();

    await connection.close();
    const msg=result.outBinds.MSG;
    let message='';
    

    if( msg==-1)
    {
        message='Course already bought';
        console.log(message);
    }
    else
    {
        message='Course transaction successful';
        console.log(message);

    }
 
    return Response.json({ message:message});
}