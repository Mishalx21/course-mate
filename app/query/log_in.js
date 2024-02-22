export default function getUserByEmailAndPassword(email, password) {
    return (
      `SELECT * 
       FROM student 
       WHERE email = '${email}' AND password = '${password}' 
       FETCH FIRST 1 ROWS ONLY`
    );
  }
  