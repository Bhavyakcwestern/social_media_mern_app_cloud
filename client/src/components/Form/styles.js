import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // Set the border color to white
        },
        '&:hover fieldset': {
          borderColor: 'orange', // Change border color to orange on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'orange', // Change border color to orange when focused
        },
        '& input': {
          color: 'white', // Set the text color to white
        },
        '& textarea': {
          color: 'white', // Set the text color to white for multiline input
        },
        '&:hover input, &:hover textarea': {
          color: 'orange', // Change text color to orange on hover
        },
        '&.Mui-focused input, &.Mui-focused textarea': {
          color: 'orange', // Change text color to orange when focused
        },
      },
      '& .MuiInputLabel-outlined': {
        color: 'orange', // Set the label color to orange
      },
      '& .MuiInputLabel-outlined.Mui-focused': {
        color: 'orange', // Keep the label color orange when focused
      },
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