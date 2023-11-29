import React, { useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { MovieList, Pagination } from "..";
import {
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import useStyles from "./styles";

const Actors = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const { id } = useParams();
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: actorMovies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3} alignItems="start">
        <Grid item lg={4} xl={2} className={classes.imageContainer}>
          <img
            className={classes.image}
            src={
              data?.profile_path
                ? `https://image.tmdb.org/t/p/w300/${data?.profile_path}`
                : "https://github.com/VinuSion/SparkWatch-Movies/assets/56313573/e70e3898-c05b-4d9f-ac2b-44f3a1c88e72"
            }
            alt={data.name}
          />
        </Grid>
        <Grid
          item
          lg={8}
          xl={10}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" gutterBottom style={{ fontWeight: 700 }}>
            {data?.name || "NO NAME 😭"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <b>Born:</b>{" "}
            {data?.birthday
              ? new Date(data?.birthday).toDateString()
              : "No specified birthdate for this actor... 🥺"}
          </Typography>
          <Typography paragraph>
            {data?.biography || "No biography found for this actor... 🥺"}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-evenly">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB Profile
            </Button>
            <Button
              startIcon={<ArrowBack />}
              color="primary"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="3rem 0">
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          style={{ fontWeight: 700 }}
        >
          Starred In
        </Typography>
        {actorMovies ? (
          <>
            <MovieList movies={actorMovies} numberOfMovies={12} />
            <Pagination currentPage={page} setPage={setPage} totalPages={actorMovies?.total_pages} />
          </>
        ) : (
          <Typography align="center">
            This actor hasn't starred in any movies yet... 🥺
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Actors;
