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

    const result = await connection.execute(`DECLARE
    cart_id NUMBER;
BEGIN
    :cart_id := ADD_CART(:student_id,:course_id);   
END;
`,
    {
        student_id: student_id,
        course_id: course_id,
        cart_id: {type: OracleDB.NUMBER, dir: OracleDB.BIND_OUT}
    },{outFormat: OracleDB.OUT_FORMAT_OBJECT});
    await connection.commit();
    const cart_id=result.outBinds.cart_id;
    await connection.close();

    let message='';
    
    console.log(cart_id);
    if(cart_id==-1)
    {
        message='Course already added to cart';
        console.log(cart_id);
        console.log(message);
    }
    else
    {
        message='Valid course added to cart';
        console.log(cart_id);
        console.log(message);

    }
 
    return Response.json({ message:message, cart_id:cart_id});
}