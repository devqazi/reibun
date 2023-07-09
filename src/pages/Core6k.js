import React, { useState } from "react";
import json from "./data/core-6k.json";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";

const uesStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));
const Core6k = () => {
  const classes = uesStyles();
  const [index, setIndex] = useState(0);
  const list = json.slice(index, index + 250);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {list.map((item) => (
          <Grid key={item.word} item xs={12} sm={6} md={4} lg={3}>
            <Paper style={{ padding: 16 }}>
              <Typography style={{ fontSize: 24 }}>
                <ruby>
                  {item.word} <rt style={{ opacity: 0.5 }}>{item.kana}</rt>
                </ruby>
              </Typography>
              <Typography color="textSecondary">{item.meaning}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Core6k;
