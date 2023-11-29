import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 0.5em 1.5em',
  },
  btns: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-around',
  },
}));