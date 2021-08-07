import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import TextError from "../../TextError";
import { Row, Col } from "react-bootstrap";

const DatePicker = (props) => {
  const { label, name, ...rest } = props;
  return (
    <Row>
      <Col>
        <div className="form-control">
          <label htmlFor={label}>{label}</label>
          <Field id={name} name={name}>
            {({ form, field }) => {
              const { setFieldValue } = form;
              const { value } = field;
              return (
                <DateView
                  id={name}
                  {...field}
                  {...rest}
                  selected={value}
                  onChange={(val) => setFieldValue(name, val)}
                />
              );
            }}
          </Field>
          <ErrorMessage name={name} component={TextError} />
        </div>
      </Col>
    </Row>
  );
};

export default DatePicker;
