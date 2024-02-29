import OracleDB from "oracledb";

export async function POST(request) {
  const connection = await OracleDB.getConnection({
    user: "c##coursemate",
    password: "password",
    connectString: "localhost:1521/ORCL",
  });

  const body = await request.json();

 // console.log(body);
  const student_id = body.student_id;
  

  const result = await connection.execute(
    `SELECT C1.COURSE_ID,(SELECT C2.COURSE_TITLE  FROM COURSE C2 WHERE C2.COURSE_ID=C1.COURSE_ID) TITLE,(SELECT C2.PRICE FROM COURSE C2 WHERE C2.COURSE_ID=C1.COURSE_ID)PRICE,(SELECT AVG(F.RATING) FROM FEEDBACK F WHERE F.COURSE_ID=C1.COURSE_ID GROUP BY F.COURSE_ID  )RATING ,C1.CART_ID FROM CART_COURSE_RELATIONSHIP C1 WHERE CART_ID=(SELECT CART_ID FROM CART C WHERE C.STUDENT_ID =${student_id})`
  );
  await connection.close();

  return Response.json(result.rows);
}
