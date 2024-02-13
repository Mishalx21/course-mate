export default function get_couse_review(course_id)
{
    return(
        `SELECT S.NAME,F.FEEDBACK_DATE,F.RATING,F.FEEDBACK_COMMENT
        FROM FEEDBACK F JOIN STUDENT S ON (F.STUDENT_ID=S.STUDENT_ID)
        WHERE F.COURSE_ID= '${course_id}'
        ORDER BY F.RATING DESC
        FETCH FIRST 3 ROWS ONLY`
    );
}