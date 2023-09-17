import React, { useState } from "react";
import json from "./data/reibun-10k.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";

const uesStyles = makeStyles((theme) => ({
  root: {},
  pagination: {
    position: "sticky",
    top: 64,
    padding: theme.spacing(1, 2),
  },
}));

const Reibun10k = () => {
  const classes = uesStyles();
  const [index, setIndex] = useState(0);
  const handlePageChange = (event, val) => {
    setIndex(val - 1);
  };
  const list = json.slice(index * 250, index * 250 + 250);
  return (
    <div className={classes.root}>
      <TableContainer>
        <Table>
          <TableBody>
            {list.map((item, k) => (
              <TableRow key={item.text}>
                <TableCell>{index * 250 + k + 1}</TableCell>
                <TableCell>
                  <Typography style={{ fontSize: 24 }}>{item.text}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reibun10k;
