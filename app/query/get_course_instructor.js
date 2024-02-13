export default function get_course_instructor(course_id) {
    return(
        `SELECT I.NAME
        FROM COURSE C JOIN COURSE_INSTRUCTOR_RELATIONSHIP  CI ON (C.COURSE_ID=CI.COURSE_ID)
        JOIN INSTRUCTOR I ON (CI.INSTRUCTOR_ID=I.INSTRUCTOR_ID)
        WHERE C.COURSE_ID=${course_id}`
    );
}