import OracleDB from "oracledb";

export async function POST(request) {
  try {
    const connection = await OracleDB.getConnection({
      user: "c##coursemate",
      password: "password",
      connectString: "localhost:1521/ORCL",
    });

    const body = await request.json();
    const cart_id = body.cart_id;
    const course_id = body.course_id;

    console.log("Course ID:", course_id);
    console.log("Cart ID:", cart_id);

    // Use bind variables to prevent SQL injection
    const result = await connection.execute(
      `DELETE FROM CART_COURSE_RELATIONSHIP WHERE COURSE_ID = :course_id AND CART_ID = :cart_id`,
      { course_id: course_id, cart_id: cart_id }
    );
    console.log(result.rowsAffected);
    await connection.commit();
    await connection.close();
    console.log("Course removed from cart");
  } catch (error) {
    console.error("Error removing course from cart:", error);
  }

  return Response.json({ message: "Course removed from cart" });
}
