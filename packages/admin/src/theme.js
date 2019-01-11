import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#494949',
      contrastText: '#fff'
    },
    secondary: {      
      main: '#FC6769',
      contrastText: '#fff'
    }
  }
});

export default theme;