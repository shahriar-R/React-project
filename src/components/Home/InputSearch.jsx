import React from 'react'
import { alpha, styled,TextField ,IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
  ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
      overflow: 'hidden',
      borderRadius: 4,
  
      backgroundColor: theme.palette.mode === 'light' ? '#7CB5F6' : '#1A2027',
      border: '1px solid',
      borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: '#7CB5F6',
      },
      '&.Mui-focused': {
        backgroundColor: '#B5CBE5',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
const InputSearch = () => {
  return (
    <div style={{display:'flex', }}>
       <RedditTextField
        label="جستجو "
        
        id="reddit-input"
        variant="filled"
        style={{ marginTop: 5}}
      />
      <IconButton type="button" color="secondary" size="large" sx={{ p: '2px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  )
}

export default InputSearch
