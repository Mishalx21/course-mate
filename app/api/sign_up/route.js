import oracledb from 'oracledb';
import insertStudentQuery from '@/app/query/sign_up';

export const POST = async (request ) => {
  try {
    
    const { name, email, password, gender, dob, education } = await request.json();

  
    const connection = await oracledb.getConnection({
        user          : "c##coursemate", 
        password      : "password",  
        connectString : "localhost:1521/ORCL"
    });

    
    //console.log("values are ");
    //console.log(name);
    //console.log(email);
    //console.log(password);
    //console.log(gender);
     //const g = 'F';
     
   
    const resultInsert = await connection.execute(
     `DECLARE 
     userId NUMBER;
     BEGIN
      :userId := CREATE_USER(:name,:email,:password,:dob,:g,:edu);
      END;`,{
      name: name,
      email: email,
      password: password,
      dob:dob,
      g:gender,
      edu:education,
      userId: {type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
      },{outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    console.log("insert success");

   
    await connection.commit();
    const userId = resultInsert.outBinds.userId;
    console.log(userId);
    

   
    await connection.close();

    if (userId === -1) {
      return Response.json({ message: 'User already exists' ,userId:userId});
    }
    else{
      return Response.json({ message: 'User created successfully',userId:userId});

    }
    
  } catch (error) {
    
    console.error('An error occurred:', error);
    return Response.json({ message: 'An error occurred while signing up' });
  }
};
