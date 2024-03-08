import oracledb from "oracledb";

export async function POST(request) {
  const connection = await oracledb.getConnection({
    user: "c##coursemate",
    password: "password",
    connectString: "localhost:1521/ORCL",
  });

  const body = await request.json();
  const student_id = body.student_id;
  const name = body.name;
  const email = body.email;
  const password = body.password;
  const gender = body.gender;
  const date_of_birth = body.date_of_birth;
  const educational_status = body.educational_status;

  try {
    const result = await connection.execute(
      `UPDATE STUDENT
       SET NAME = '${name}',
           EMAIL = '${email}',
           PASSWORD = '${password}',
           GENDER = '${gender}',
           DATE_OF_BIRTH = TO_DATE('${date_of_birth}', 'YYYY-MM-DD'),
           EDUCATIONAL_STATUS = '${educational_status}'
       WHERE STUDENT_ID = ${student_id}`
    );

    connection.commit();
    await connection.close();

    return Response.json(result.rowsAffected);
  } catch (error) {
    console.error("Error executing SQL statement:", error);
    await connection.rollback();
    await connection.close();
    return Response.error("Failed to update profile.");
  }
}
