import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";
import { Redirect } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import authorStore from "../stores/authorStore";
const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    title: "",
    authorId: null,
    category: "",
  });

  // after change reload the page to view
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
      // setAuthors(
      //   authorApi.getAuthors().then((authors) => {
      //     return authors;
      //   })
      // );
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [props.match.params.slug, courses]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  const handleChange = ({ target }) => {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  };

  function formIsValid(course) {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required.";
    if (!course.authorId) _errors.authorId = "Author ID is required.";
    if (!course.category) _errors.category = "Category is required.";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid(course)) return;

    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved");
    });
  };

  if (course) {
    return (
      <div>
        <h2>Manage Course</h2>
        <CourseForm
          errors={errors}
          course={course}
          onChange={handleChange}
          onSubmit={handleSubmit}
          authors={authorStore.getAuthors()}
        />
      </div>
    );
  } else {
    return <Redirect to="/404" component={NotFoundPage} />;
  }
};

export default ManageCoursePage;
