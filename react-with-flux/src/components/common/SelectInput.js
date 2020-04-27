import React from "react";
import PropTypes from "prop-types";

const SelectInput = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          value={props.value || ""}
          className="form-control"
          onChange={props.onChange}
        >
          <option value="">-select-</option>
          {props.authors.map((author) => {
            return <option value={author.id}>{author.name}</option>;
          })}
        </select>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  course: PropTypes.object,
  authors: PropTypes.array,
};

SelectInput.defaultProps = {
  error: "",
};

export default SelectInput;
