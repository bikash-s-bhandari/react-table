import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../../TextError";
import { Row, Col } from "react-bootstrap";

const TextArea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <Row>
      <Col>
        <div className="form-control">
          <label htmlFor={label}>{label}</label>
          <Field as="textarea" id={name} name={name} {...rest} />
          <ErrorMessage name={name} component={TextError} />
        </div>
      </Col>
    </Row>
  );
};

export default TextArea;
