import OracleDB from "oracledb";

export async function POST(request) {
  const connection = await OracleDB.getConnection({
    user: "c##coursemate",
    password: "password",
    connectString: "localhost:1521/ORCL",
  });

  const body = await request.json();

 // console.log(body);
  const course_id = body.course_id ;
  console.log("module course:",course_id);
  

  const result = await connection.execute(
    `SELECT  M.MODULE_ID,M.MODULE_TITLE
    FROM MODULE M JOIN COURSE_MODULE_RELATIONSHIP C
    ON M.MODULE_ID=C.MODULE_ID
    WHERE C.COURSE_ID=${course_id}
    `
  );
  await connection.close();

  return Response.json(result.rows);
}
