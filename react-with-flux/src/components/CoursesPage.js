import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";

const CoursesPage = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then((_courses) => {
      setCourses(_courses);
    });
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <CourseList courses={courses} />
    </div>
  );
};

export default CoursesPage;
