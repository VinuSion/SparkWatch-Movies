import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: "start",
    margin: '10px 0 !important',
    [theme.breakpoints.down('sm')]: {
      alignItems: "center",
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px !important",
  },
  poster: {
    borderRadius: '20px',
    boxShadow: '0.5em 0.5em 1em rgb(64, 64, 70)',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto !important',
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto !important',
      width: '100%',
      height: '350px',
      marginBottom: '30px',
    },
  },
  genresContainer: {
    margin: '5px 0 !important',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
  },
  castImage: {
    width: '100%',
    maxWidth: '7em',
    height: '7em',
    objectFit: 'cover',
    borderRadius: '20%',
    "&:hover": {
      transform: "scale(1.05)",
      border: "solid 2px",
      borderColor: theme.palette.mode === 'light' ? '#1976d2' : "#dc1a28",
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    background: theme.palette.mode === 'light' ? '#ffffff' : "#1c1c1c",
    padding: "4rem 2rem",
    borderRadius: "25px",
  },
  video: {
    width: '50%',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '90%',
    },
  },
}));
