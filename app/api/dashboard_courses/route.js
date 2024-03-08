import oracledb from "oracledb";
import get_couse_review from "@/app/query/get_course_review";

export async function POST(request) {
  const connection = await oracledb.getConnection({
    user: "c##coursemate",
    password: "password",
    connectString: "localhost:1521/ORCL",
  });

  //console.log(request.body)
  console.log("in get feedback");
  const body = await request.json();
  const student_id=body.student_id;
console.log("student id",student_id);
  
  //console.log("body",request);
  const result = await connection.execute(`SELECT DISTINCT T.COURSE_ID,
  C.COURSE_TITLE AS COURSE_NAME,
  C.PRICE AS PRICE,
        ROUND(
  (SELECT AVG(F1.RATING) 
   FROM FEEDBACK F1 
   WHERE T.COURSE_ID = F1.COURSE_ID),1) AS RATING,(SELECT COUNT (*) FROM TRANSACTION T1 WHERE T.COURSE_ID=T1.COURSE_ID GROUP BY T1.COURSE_ID) BUY_COUNT 
FROM TRANSACTION T 
JOIN COURSE C ON C.COURSE_ID = T.COURSE_ID
JOIN FEEDBACK F ON F.COURSE_ID = T.COURSE_ID
WHERE T.STUDENT_ID = ${student_id}`);
  await connection.close();

  return Response.json(result.rows);
}