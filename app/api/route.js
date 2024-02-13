import OracleDB from 'oracledb';
//import oracledb from 'oracledb';

// import pool from '../connection/connnectdb';
import { top_course } from '../query/top_course';


export async function GET(){
    const connection = await OracleDB.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });

    const result = await connection.execute(top_course);
    //console.log("Result is:", result.rows);
    //res.status(200).json(result.rows);

    await connection.close();
    return Response.json(result.rows);
}