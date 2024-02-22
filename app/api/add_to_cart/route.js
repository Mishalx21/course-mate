import OracleDB from 'oracledb';
export async function POST(request){
    const connection = await OracleDB.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });
   
    const body =await request.json();
    

    const result = await connection.execute(`DECLARE
    user_id NUMBER;
    user_name VARCHAR2(255);
BEGIN
    CHECK_USER(:email, :password, :user_id, :user_name);
    
END;
`,
    {
        email: user_email,
        password: user_password,
        user_id: {type: OracleDB.NUMBER, dir: OracleDB.BIND_OUT},
        user_name: {type: OracleDB.STRING, dir: OracleDB.BIND_OUT}
    },{outFormat: OracleDB.OUT_FORMAT_OBJECT});
    await connection.close();
    let message='';
    let success = false;
    const u_id=result.outBinds.user_id;
    const u_name=result.outBinds.user_name;
    if(u_id==-2)
    {
        message='Invalid Password';
        success=false;
        console.log(u_id);
    }
    else if(u_id==-1)
    {
        message='User is not registered';
        success=false;
        console.log(u_id);
    }
    else
    {
        message='Valid user';
        console.log(u_id);
        console.log(u_name);
        success=true;
    }
 
    return Response.json({success:success, message:message, user_id:u_id, user_name:u_name});
}