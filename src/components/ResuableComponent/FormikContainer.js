import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
const FormikContainer = () => {
  const initialValues = {
    email: "",
    about: "",
    category: "",
    radioOption: "",
    skills: [],
    startDate: null,
    endDate: null,
  };
  const validationSchema = Yup.object({
    email: Yup.string().required(),
    about: Yup.string().required(),
    category: Yup.string().required(),
    radioOption: Yup.string().required(),
    skills: Yup.array().required(),
    startDate: Yup.date().required("Start Date is required").nullable(), //nullable allow us to set null value
  });

  const selectOptions = [
    { key: "Category1", value: 1 },
    { key: "Category2", value: 2 },
    { key: "Category3", value: 3 },
  ];
  const radioOptions = [
    { key: "Option1", value: "1" },
    { key: "Option2", value: "2" },
    { key: "Option3", value: "3" },
  ];
  const checkOptions = [
    { key: "Skill1", value: "1" },
    { key: "Skill2", value: "2" },
    { key: "Skill3", value: "3" },
  ];

  const onSubmit = (values) => {
    console.log({ values });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            name="email"
            type="email"
            label="Email Address"
          />
          <FormikControl control="textarea" name="about" label="About" />
          <FormikControl
            control="select"
            options={selectOptions}
            name="category"
            label="Select Category"
          />
          <FormikControl
            control="radio"
            options={radioOptions}
            name="radioOption"
            label="Radio Topic"
          />
          <FormikControl
            control="checkbox"
            options={checkOptions}
            name="skills"
            label="Select Skills"
          />
          <FormikControl control="date" name="startDate" label="Start Date" />
          <FormikControl control="date" name="endDate" label="End Date" />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
