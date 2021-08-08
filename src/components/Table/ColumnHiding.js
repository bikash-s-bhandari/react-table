import React, { useMemo } from "react";
import { useTable } from "react-table";
import MockData from "../MOCK_DATA.json";
import { COLUMNS } from "./Columns";
import "./table.css";
import { Checkbox } from "./Checkbox";
const ColumnHiding = () => {
  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => MockData, []); //useMemo ensure that data isnt re-create in every render
  //calling useTable Hooks
  const tableInstance = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    allColumns, //array of all columns supplied in a table
    getToggleHideAllColumnsProps, //show or hide all columns at once
  } = tableInstance;

  return (
    <>
      <div>
        <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
      </div>

      {allColumns.map((column) => (
        <div key={column.id}>
          {" "}
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />
            {column.Header}
          </label>
        </div>
      ))}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

export default ColumnHiding;
