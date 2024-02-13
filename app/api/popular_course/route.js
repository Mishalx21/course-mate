import OracleDB from 'oracledb';
//import oracledb from 'oracledb';
// import pool from '../connection/connnectdb';
import get_popular_courses from '@/app/query/get_popular_courses';

export async function GET(){
    const connection = await OracleDB.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });

    const result = await connection.execute(get_popular_courses());
    await connection.close();
    return Response.json(result.rows);
}