import React, { FC } from "react";
import { Box, Table as BulmaTable } from "react-bulma-components";
import "../styles/Dashboard.css";

interface TableProps {
  head: any;
  body: any;
}

const MyTable: FC<TableProps> = (props) => {
  return (
    <Box className="component">
      <BulmaTable
        className="component is-shadowless"
        style={{ color: "white" }}
      >
        <thead style={{ color: "white" }}>{props.head}</thead>
        <tbody>{props.body}</tbody>
      </BulmaTable>
    </Box>
  );
};

export default MyTable;
