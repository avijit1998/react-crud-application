import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";
import SelectInput from "./common/SelectInput";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        name="title"
        className="form-control"
        value={props.course.title}
        onChange={props.onChange}
        label="Title"
        error={props.errors.title}
      />

      <SelectInput
        id="author"
        label="Author"
        name="authorId"
        value={props.course.authorId}
        course={props.course}
        onChange={props.onChange}
        authors={props.authors}
        error={props.errors.authorId}
      />

      <TextInput
        label="Category"
        id="category"
        name="category"
        className="form-control"
        value={props.course.category}
        onChange={props.onChange}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CourseForm;
