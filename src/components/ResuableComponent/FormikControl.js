import React from "react";
import Input from "./Fields/Input";
import TextArea from "./Fields/TextArea";
import Select from "./Fields/Select";
import Radio from "./Fields/Radio";
import Checkbox from "./Fields/Checkbox";
import DatePicker from "./Fields/DatePicker";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
