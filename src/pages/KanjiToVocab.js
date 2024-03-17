import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import core6k from "./data/core-6k.json";
import { Alert } from "@material-ui/lab";

const uesStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 720,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    alignSelf: "center",
  },
}));

const KanjiToVocab = () => {
  const classes = uesStyles();
  const [strict, setStrict] = useState(false);
  const [knownKanji, setKnownKanji] = useState("人 入 八");
  const [vocab, setVocab] = useState([]);

  const isKanji = (char) => {
    return /[\u4e00-\u9faf\u3400-\u4dbf]/.test(char);
  };

  const checkWord = (word, knownKanjiMap) => {
    let charsInWord = word.split("");
    let containsKnownKanji = false;
    for (let j in charsInWord) {
      const char = charsInWord[j];
      if (isKanji(char) && knownKanjiMap[char]) {
        containsKnownKanji = true;
        break;
      }
    }
    return containsKnownKanji;
  };

  const checkWordStrict = (word, knownKanjiMap) => {
    let charsInWord = word.split("");
    let containsKnownKanji = true;
    let hasKanji = false;
    for (let j in charsInWord) {
      const char = charsInWord[j];
      if (isKanji(char)) {
        hasKanji = true;
        if (!knownKanjiMap[char]) {
          containsKnownKanji = false;
          break;
        }
      }
    }
    return hasKanji && containsKnownKanji;
  };

  const onGenerateVocab = () => {
    let knownKanjiMap = {};
    knownKanji.split("").forEach((char) => {
      if (isKanji(char)) {
        knownKanjiMap[char] = true;
      }
    });
    const vocab = [];
    for (let i in core6k) {
      const word = core6k[i].word;
      if (strict) {
        if (checkWordStrict(word, knownKanjiMap)) {
          vocab.push(word);
        }
      } else {
        if (checkWord(word, knownKanjiMap)) {
          vocab.push(word);
        }
      }
    }
    setVocab(vocab);
  };

  return (
    <Paper className={classes.root}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        label="Known Kanji"
        multiline
        minRows={6}
        maxRows={10}
        value={knownKanji}
        onChange={(e) => setKnownKanji(e.target.value)}
      />
      <Alert severity="info" variant="outlined">
        Note: This tool looks through a 6k deck to generate words. Also 々 will
        always be icluded
      </Alert>
      <div className={classes.controls}>
        <Button variant="contained" color="primary" onClick={onGenerateVocab}>
          Generate Vocab
        </Button>
        <FormControlLabel
          control={
            <Checkbox
              checked={strict}
              onChange={(e) => setStrict(e.target.checked)}
              color="primary"
            />
          }
          label="Match whole word"
        />
      </div>
      <div>
        <Grid container spacing={2}>
          {vocab.map((word, index) => (
            <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
              {word}
            </Grid>
          ))}
        </Grid>
      </div>
    </Paper>
  );
};

export default KanjiToVocab;
