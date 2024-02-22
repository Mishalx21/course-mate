import oracledb from 'oracledb';
import insertStudentQuery from '@/app/query/sign_up';

export const POST = async (request ) => {
  try {
    
    const { name, email, password, gender, dob, education } = await request.json();

  
    const connection = await oracledb.getConnection({
      user: "c##coursemate",
      password: "12345",
      connectString: "localhost:1521/ORCL"
    });

    
    //console.log("values are ");
    //console.log(name);
    //console.log(email);
    //console.log(password);
    //console.log(gender);
     //const g = 'F';
   
    const resultInsert = await connection.execute(
      insertStudentQuery(name, email, password, g , dob, education )
    );
    console.log("insert success");

   
    await connection.commit();

   
    await connection.close();

    
    return Response.json({ message: 'Sign-up successful' });
  } catch (error) {
    
    console.error('An error occurred:', error);
    return Response.json({ message: 'An error occurred while signing up' });
  }
};
