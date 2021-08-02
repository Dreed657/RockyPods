import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, username, rounds }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{username}</TableCell>
            <TableCell>{rounds}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
