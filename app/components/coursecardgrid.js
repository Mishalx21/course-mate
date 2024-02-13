import CourseCard from "./coursecard";

const CourseCardGrid = ({ courses }) => {
    return (
        <div className="flex overflow-x-auto space-x-4 p-4 ">
            {courses.map(course => (
                <CourseCard
                    key={course[0]}
                    course_id={course[0]}
                    course_name={course[1]}
                    course_rating={course[3]}
                    course_price={course[2]}
                    buy_count={course[4]}
                    className="mr-5" // Add margin between cards
                />
            ))}
        </div>
    );
};

export default CourseCardGrid;
