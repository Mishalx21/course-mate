CREATE OR REPLACE PROCEDURE CHECK_USER (
    user_email IN VARCHAR2,
    user_password IN VARCHAR2,
    user_id OUT NUMBER,
    user_name OUT VARCHAR2
)
AS
    USER_COUNT NUMBER;
		PASS_COUNT NUMBER;
BEGIN

    SELECT COUNT(*) INTO USER_COUNT FROM STUDENT WHERE EMAIL = user_email;

    IF USER_COUNT > 0 THEN
				
				SELECT  COUNT(*) INTO PASS_COUNT FROM STUDENT WHERE EMAIL = user_email AND PASSWORD = user_password;
				
				IF PASS_COUNT >0 THEN 
        SELECT STUDENT_ID, NAME INTO user_id, user_name FROM STUDENT WHERE EMAIL = user_email AND PASSWORD = user_password;
				END IF;
        IF PASS_COUNT = 0 THEN
            user_id := -2; 
            user_name := NULL; 
        END IF;
    ELSE
        user_id := -1; 
        user_name := NULL; 
    END IF;
END;