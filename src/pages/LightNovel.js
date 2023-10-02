import { LinearProgress, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: theme.spacing(3),
    fontWeight: 400,
    color: "#e0e0e0",
    "& > p": {
      margin: theme.spacing(2),
      fontSize: "2.5rem",
    },
  },
}));

const countUniqueKanji = (lines) => {
  const map = {};
  const regex = /^[一-龠]$/u;
  const result = [];
  for (let i in lines) {
    let line = lines[i];
    for (let j = 0; j < line.length; j++) {
      let char = line[j];
      if (regex.test(char)) {
        map[char] = true;
      }
    }
    result.push(Object.keys(map).length);
  }
  return result;
};

const LightNovel = ({ name }) => {
  const [lines, setLines] = useState([]);
  const [uniqueKanjiCount, setUniqueKanjiCount] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/books/" + name)
      .then((response) => response.json())
      .then((json) => {
        setLines(json);
        setUniqueKanjiCount(countUniqueKanji(json));
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
        <p key={i}>
          <span style={{ marginRight: 4 }}>{uniqueKanjiCount[i]}</span>
          <span dangerouslySetInnerHTML={{ __html: line }}></span>
        </p>
      ))}
    </div>
  );
};

export default LightNovel;
