import OracleDB from "oracledb";

export async function POST(request) {
  const connection = await OracleDB.getConnection({
    user: "c##coursemate",
    password: "password",
    connectString: "localhost:1521/ORCL",
  });

  const body = await request.json();

 // console.log(body);
  const module_id = body.module_id ;
  

  const result = await connection.execute(
    `SELECT C.CONTENT_TITLE,C.CONTENT_TYPE,C.LINK
    FROM MODULE_CONTENT_RELATIONSHIP MC JOIN CONTENT C
    ON MC.CONTENT_ID=C.CONTENT_ID
    WHERE MC.MODULE_ID =${module_id}
    `
  );
  
  await connection.close();

  return Response.json(result.rows);
}
