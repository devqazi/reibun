import { LinearProgress, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: theme.spacing(3),
    fontWeight: 400,
    color: "#e0e0e0",
    "& > p": {
      margin: theme.spacing(2),
    },
  },
}));

const LightNovel = ({ name }) => {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/books/" + name)
      .then((response) => response.json())
      .then((json) => {
        setLines(json);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {loading ? <LinearProgress /> : null}
      {lines.map((line, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: line }}></p>
      ))}
    </div>
  );
};

export default LightNovel;
