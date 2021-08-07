import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {
  //filter is value of searched text field and setFilter is setter function
  const [value, setvalue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setvalue(e.target.value);
          onChange(e.target.value);
        }}
      />{" "}
    </span>
  );
};

export default GlobalFilter;
