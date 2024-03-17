import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  makeStyles,
  Drawer,
  Divider,
  List,
  ListItem,
} from "@material-ui/core";

import { yellow } from "@material-ui/core/colors";
import React, { useState } from "react";
import { Menu as MenuIcon } from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const uesStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  icon: {
    color: yellow[600],
    marginLeft: theme.spacing(1),
  },
  button: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  searchFilter: {
    marginLeft: "auto",
  },
  menuIcon: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  langButton: {
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
    },
  },
  searchInput: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  searchFilter: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const DrawerItems = [
  { label: "Kanji to Vocab", page: "kanji-to-vocab" },
  { label: "言葉 六千", page: "core-6k" },
  { label: "例文", page: "reibun-10k" },
  { label: "アキカン", page: "akikan" },
  { label: "隣の天使様", page: "tonari-no-tenshi" },
  { label: "回復術し", page: "kaifuku-jutsu-shi" },
  { label: "浦島太郎", page: "urashima-tarou" },
  { label: "雪女", page: "yuki-onna" },
];

const NavBar = ({ onNavigate }) => {
  const classes = uesStyles();
  const [drawer, setDrawer] = useState(false);

  const handleNavigate = (event) => {
    setDrawer(false);
    onNavigate(event.currentTarget.dataset.page);
  };

  return (
    <AppBar position="sticky" color="transparent" className={classes.root}>
      <Toolbar>
        <IconButton onClick={() => setDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography>日本語の練習</Typography>
      </Toolbar>
      <Drawer
        PaperProps={{ style: { width: 240 } }}
        anchor="left"
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        {DrawerItems.map((item) => (
          <ListItem
            onClick={handleNavigate}
            key={item.label}
            data-page={item.page}
            button
          >
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        ))}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
