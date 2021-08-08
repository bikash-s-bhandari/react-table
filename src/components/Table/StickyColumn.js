import React, { useMemo } from "react";
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import MockData from "../MOCK_DATA.json";
import { COLUMNS } from "./Columns";
import "./table.css";
import { Styles } from "./TableStyles";

const StickyColumn = () => {
  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => MockData, []); //useMemo ensure that data isnt re-create in every render
  //calling useTable Hooks
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useSticky
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <Styles>
        <div
          {...getTableProps()}
          className="table sticky"
          style={{ width: 1000, height: 500 }}
        >
          <div className="header">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render("Header")}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div {...getTableBodyProps()} className="body">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Styles>
    </>
  );
};

export default StickyColumn;
