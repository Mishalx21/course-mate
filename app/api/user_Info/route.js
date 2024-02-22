
import oracledb from 'oracledb';


export async function POST(request){

    
    const connection = await oracledb.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });
    const body =await request.json();
    const user_id = body.id;
    //console.log("User id1:", user_id);
    const result = await connection.execute(`SELECT * FROM STUDENT WHERE STUDENT_ID = ${user_id}`);
    await connection.close();
    //console.log(result.rows);
    return Response.json(result.rows);
}