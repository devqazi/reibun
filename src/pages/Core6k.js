import React, { useState } from "react";
import json from "./data/core-6k.json";
import {
  Button,
  ButtonBase,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";

const uesStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  pagination: {
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 72,
  },
  pageBtn: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
}));

const Core6k = () => {
  const classes = uesStyles();
  const [index, setIndex] = useState(0);
  const pageSize = 250;
  const list = json.slice(index, index + pageSize);
  const numPages = Math.ceil(json.length / 250);

  const handlePage = (event) => {
    const index = Number(event.currentTarget.dataset.index);
    setIndex(index * pageSize);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item>
          <Paper className={classes.pagination}>
            {Array(numPages)
              .fill(0)
              .map((item, index) => (
                <ButtonBase
                  onClick={handlePage}
                  data-index={index}
                  key={index}
                  className={classes.pageBtn}
                >
                  {index + 1}
                </ButtonBase>
              ))}
          </Paper>
        </Grid>
        <Grid container item xs spacing={1}>
          {list.map((item) => (
            <Grid key={item.word} item xs={6} sm={4} md={3} lg={2}>
              <Paper style={{ padding: 16 }}>
                <Typography style={{ fontSize: 24 }}>{item.word}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Core6k;
