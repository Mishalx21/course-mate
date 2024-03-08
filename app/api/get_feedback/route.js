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
  const course_id = body.course_id;
  const student_id = body.student_id;
  
  console.log("course id",course_id);

  console.log("student id",student_id);
  //console.log("body",request);
  const result = await connection.execute(`SELECT RATING,FEEDBACK_COMMENT
  FROM FEEDBACK
  WHERE STUDENT_ID =${student_id} AND COURSE_ID=${course_id}`);
  await connection.close();

  return Response.json(result.rows);
}
