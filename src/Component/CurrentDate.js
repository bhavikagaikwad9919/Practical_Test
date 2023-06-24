import React, { useState } from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const CurrentDate = ()=>{
    const [currentDate, setCurrentDate] = useState(new Date());

    const prevWeekHandler = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
      };

        const nextWeekHandler = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
      };

    return(
        <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
          <div onClick={prevWeekHandler} style={{display:"contents"}}>
          <ArrowLeftIcon />
          <h5>Previous Week</h5>
          </div>
        <Box sx={{ flexGrow: 1 }} />
        <p>{currentDate.toDateString()}</p>
        <Box sx={{ flexGrow: 1 }} />
          <div onClick={nextWeekHandler} style={{display:"contents"}}>
            <h5>Next Week</h5>
            <ArrowRightIcon />
            </div>    
              </Toolbar>
    </AppBar>
  </Box>
    )

}

export default CurrentDate