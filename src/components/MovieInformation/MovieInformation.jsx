import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
  FavoriteBorder,
} from "@mui/icons-material";
import genreIcons from "../../assets/genres";
import { MovieList } from "..";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { userSelector } from "../../features/auth";
import useStyles from "./styles";

const MovieInformation = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { user } = useSelector(userSelector);

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies, isFetching: isFetchingMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, isFetching: isFetchingWatchlist } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      list: "/recommendations",
      movie_id: id,
    });

  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => {
        movie?.id === data?.id;
      })
    );
    setIsWatchlisted(
      !!watchlistMovies?.results?.find((movie) => {
        movie?.id === data?.id;
      })
    );
  }, [favoriteMovies, watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        import.meta.env.VITE_REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      { media_type: "movie", media_id: id, favorite: !isMovieFavorited }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        import.meta.env.VITE_REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      { media_type: "movie", media_id: id, watchlist: !isWatchlisted }
    );

    setIsWatchlisted((prev) => !prev);
  };

  if (isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="2rem" />
      </Box>
    );
  }

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (isFetchingMovies || isFetchingWatchlist) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - Click here to go back!</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} className={classes.imageContainer}>
        <img
          className={classes.poster}
          src={
            data?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
              : "https://github.com/VinuSion/SparkWatch-Movies/assets/56313573/85af073e-6d13-486a-ad57-12606feb6da3"
          }
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          {data?.title ? data?.title : "NO TITLE FOUND"}{" "}
          {data.release_date !== ""
            ? `(${data.release_date.split("-")[0]})`
            : ""}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "1em" }}
            >
              {parseFloat(data?.vote_average).toFixed(1)} / 10
            </Typography>
          </Box>
          <Typography align="center" gutterBottom>
            {data?.runtime ? `${data?.runtime}min` : "NO RUNTIME"}{" "}
            {data?.spoken_languages.length > 0
              ? `| ${data?.spoken_languages[0].name}`
              : "| NA"}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.length > 0 ? (
            data?.genres?.map((genre) => (
              <Link
                key={genre.name}
                className={classes.links}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
                <Typography color="textPrimary" variant="subtitle1">
                  {genre?.name}
                </Typography>
              </Link>
            ))
          ) : (
            <Typography>No genres found for this movie... 😔</Typography>
          )}
        </Grid>
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginTop: "1em", fontWeight: "600" }}
        >
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview
            ? data?.overview
            : "No overview found for this movie... 😔"}
        </Typography>
        <Typography variant="h5" gutterBottom style={{ fontWeight: "600" }}>
          Top cast
        </Typography>
        <Grid item container spacing={2}>
          {data.credits.cast.length > 0 ? (
            data &&
            data.credits.cast
              .map(
                (character, index) =>
                  character.profile_path && (
                    <Grid
                      key={index}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={
                          character.profile_path
                            ? `https://image.tmdb.org/t/p/w500/${character.profile_path}`
                            : "https://github.com/VinuSion/SparkWatch-Movies/assets/56313573/e70e3898-c05b-4d9f-ac2b-44f3a1c88e72"
                        }
                        alt={character.name}
                      />
                      <Typography
                        color="textPrimary"
                        style={{ fontWeight: "600" }}
                      >
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)
          ) : (
            <Typography style={{ marginLeft: "20px", marginTop: "1.5em" }}>
              No actors found for this movie... 😔
            </Typography>
          )}
        </Grid>
        <Grid item container style={{ marginTop: "1.5rem" }}>
          <div className={classes.buttonContainer}>
            <Grid
              item
              xs={12}
              sm={6}
              className={classes.buttonContainer}
              style={{ marginTop: "1em" }}
            >
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              className={classes.buttonContainer}
              style={{ marginTop: "1em" }}
            >
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "Remove" : "Add"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle3"
                    style={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          style={{ fontWeight: 700, marginBottom: "2rem" }}
        >
          You might also like
        </Typography>
        {recommendations?.results?.length > 0 ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Typography align="center">No recommendations found... 😔</Typography>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 ? (
          <iframe
            autoPlay
            className={classes.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
            style={{ border: "0" }}
          />
        ) : (
          <Box className={classes.modalBox} style={{ fontWeight: "600" }}>
            No trailer found for this movie... 😔
          </Box>
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
