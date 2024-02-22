export default function insertStudentQuery(name, email, password , gender, dateOfBirth, educationalStatus) {
    return (
        
        `INSERT INTO STUDENT (STUDENT_ID, NAME, EMAIL, PASSWORD, GENDER, DATE_OF_BIRTH, EDUCATIONAL_STATUS)
        VALUES (student_seq.NEXTVAL, ${name}, ${email},${password}, ${gender}, ${dateOfBirth}, 'MM/DD/YYYY'), ${educationalStatus})`
    );
}
