import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Movie = ({ movie, index }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={index} timeout={(index + 1) * 100}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img
            alt={movie.title}
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://github.com/VinuSion/SparkWatch-Movies/assets/56313573/85af073e-6d13-486a-ad57-12606feb6da3"
            }
          />
          <Typography className={classes.title} variant="h6">
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${parseFloat(movie.vote_average).toFixed(1)} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
