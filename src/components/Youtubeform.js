import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import RadioButton from "./RadioButton";

const Youtubeform = () => {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    skills: [""],
    radioOption: "",
  };

  const radioOptions = [
    { key: "Option1", value: "Option1Value1" },
    { key: "Option2", value: "Option1Value2" },
    { key: "Option3", value: "Option1Value3" },
  ];

  const onSubmit = (values, onSubmitProps) => {
    console.log("subimitted", values);

    //api call success
    onSubmitProps.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    channel: Yup.string().required("Channel is required"),
    address: Yup.string().required(),
    radioOption: Yup.string().required(),
  });

  const validateComments = (value) => {
    let error;
    if (!value) {
      error = "Comment field is required";
    }
    return error;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnMount
      //  validateOnChange={false}
      //  validateOnBlur={false}
    >
      {(formik) => {
        return (
          <Form>
            <Row>
              <Col>
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component={TextError} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component={TextError} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="channel">Channel</label>
                <Field type="text" name="channel" className="form-control" />
                <ErrorMessage name="channel">
                  {(errMsg) => <div className="error">{errMsg}</div>}
                </ErrorMessage>
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="comments">Comments</label>
                <Field
                  as="textarea"
                  name="comments"
                  className="form-control"
                  validate={validateComments}
                />
                <ErrorMessage name="comments" component={TextError} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="address">Address</label>
                <FastField name="address" className="form-control">
                  {(props) => {
                    console.log("test");
                    const { field, form, meta } = props;
                    console.log(props);
                    return (
                      <div>
                        <input
                          id="address"
                          {...field}
                          className="form-control"
                        />
                        {meta.touched && meta.error ? (
                          <div>{meta.error}</div>
                        ) : null}
                      </div>
                    );
                  }}
                </FastField>
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="facebook">Facebook</label>
                <Field
                  type="text"
                  name="social.facebook"
                  className="form-control"
                />
                <ErrorMessage name="social.facebook" component={TextError} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="twitter">Twitter</label>
                <Field
                  type="text"
                  name="social.twitter"
                  className="form-control"
                />
                <ErrorMessage name="social.twitter" component={TextError} />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="facebook">Primary Number</label>
                <Field
                  type="text"
                  name="phoneNumbers[0]"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="facebook">Secondary Number</label>
                <Field
                  type="text"
                  name="phoneNumbers[1]"
                  className="form-control"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <label htmlFor="facebook">Skills</label>
                <FieldArray name="skills">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { skills } = values;

                    return (
                      <div>
                        {skills.map((item, index) => (
                          <div key={index}>
                            <Field name={`skills[${index}]`} />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}

                            <button type="button" onClick={() => push("")}>
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </Col>
            </Row>
            <Row>
              <Col>
                <RadioButton
                  label="Radio Topic"
                  name="radioOption"
                  options={radioOptions}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <button
                  type="button"
                  onClick={() => {
                    formik.validateField("comments");
                    formik.setFieldTouched("comments");
                  }}
                >
                  Validate Comments
                </button>
                <button
                  type="button"
                  onClick={() => {
                    formik.validateForm();
                    formik.setTouched({
                      name: true,
                      email: true,
                      channel: true,
                    });
                  }}
                >
                  Validate All
                </button>

                <button
                  type="submit"
                  className="btn btn-sm btn-primary"
                  disabled={!formik.isValid}
                >
                  Submit
                </button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Youtubeform;
