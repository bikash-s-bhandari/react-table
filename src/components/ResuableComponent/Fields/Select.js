import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../../TextError";
import { Row, Col } from "react-bootstrap";

const Select = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <Row>
      <Col>
        <div className="form-control">
          <label htmlFor={label}>{label}</label>
          <Field as="select" id={name} name={name} {...rest}>
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.key}
                </option>
              );
            })}
          </Field>
          <ErrorMessage name={name} component={TextError} />
        </div>
      </Col>
    </Row>
  );
};

export default Select;
