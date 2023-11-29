import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { redLogo, blueLogo } from "../../assets/images/logos";
import genreIcons from "../../assets/genres";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./styles";
import { useGetGenresQuery } from "../../services/TMDB";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName])
  
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? blueLogo : redLogo}
          alt="Sparkwatch_logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
