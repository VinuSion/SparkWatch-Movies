import React, { useEffect } from "react";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "..";

const Profile = () => {
  const { user } = useSelector(userSelector);

  const {
    data: favoriteMovies,
    refetch: refetchFavorites,
    isFetching: isFetchingMovies,
  } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const {
    data: watchlistMovies,
    refetch: refetchWathlisted,
    isFetching: isFetchingWatchlist,
  } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(() => {
    refetchFavorites();
    refetchWathlisted();
  }, []);

  if (isFetchingMovies || isFetchingWatchlist) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" gutterBottom style={{ fontWeight: "700" }}>
          My profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h6">
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
