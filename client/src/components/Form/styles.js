import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      color: 'white',
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: 'black',
    color: 'white',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: 'orange',
    color: 'white',
  },
  loginButton: {
    marginLeft: 'auto',
    backgroundColor: 'orange',
    color: 'white',
  },
}));