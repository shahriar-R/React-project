import { createTheme} from '@mui/material/styles';
import {blue, grey} from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary:{
            main: '#FDFEFE',
        },
        

    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
      },
    myButton:{
        backgroundColor : "red",
        color: "white",
        border: "1px solid black"
    }
})
export default theme;