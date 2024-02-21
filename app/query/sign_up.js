export default function insertStudentQuery(name, email, password , gender, dateOfBirth, educationalStatus) {
    return (
        
        `INSERT INTO student (student_id, name, email, password, gender, date_of_birth, educational_status)
        VALUES (student_seq.NEXTVAL, '${name}', '${email}','${password}', '${gender}', TO_DATE('${dateOfBirth}', 'YYYY-MM-DD'), '${educationalStatus}')`
    );
}
