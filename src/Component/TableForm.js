import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox';
import CurrentDate from './CurrentDate';


function TableForm() {
  const [selectedTimezone, setSelectedTimezone] = useState('UTC-0');
  const [selectedTimes, setSelectedTimes] = useState([]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const workingTimes = Array.from({ length: 16 }, (_, index) => index + 8);

  const handleCheckboxChange = (day, time) => {
    const timeSlot = { day, time };
    if (isSelected(timeSlot)) {
      setSelectedTimes(selectedTimes.filter((slot) => !(slot.day === day && slot.time === time)));
    } else {
      setSelectedTimes([...selectedTimes, timeSlot]);
    }
  };


  const isSelected = (timeSlot) => {
    return selectedTimes.some((slot) => slot.day === timeSlot.day && slot.time === timeSlot.time);
  };


  const timezoneChangeHandler = (event) => {
    setSelectedTimezone(event.target.value);
  };


  const convertTimezone = (time) => {
    const convertedTime = new Date(time);
    const timezoneOffset = convertedTime.getTimezoneOffset() * 60000;
    const targetTimezoneOffset = selectedTimezone === 'UTC-0' ? 0 : new Date().getTimezoneOffset() * 60000;
    convertedTime.setTime(convertedTime.getTime() + timezoneOffset + targetTimezoneOffset);
    return convertedTime.toLocaleTimeString();
  };

  return (
<>
  <CurrentDate />

  <Box sx={{ minWidth: 120 ,marginTop:"5px" }}>
      <FormControl fullWidth>
      <InputLabel id="demo-select-small-label">Timezone</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        label="Timezone"
        value={selectedTimezone} 
          onChange={timezoneChangeHandler}
      >
        
        <MenuItem value="UTC-0">UTC-0</MenuItem>
          <MenuItem value="UTC-5">UTC-5</MenuItem>
      </Select>

      </FormControl>

    </Box>

    <div>
    <Table>
  <TableBody>
    {daysOfWeek.map((day) => (
      <React.Fragment key={day}>
        <TableRow>
          <TableCell>{day}</TableCell>
          {workingTimes.slice(0, 8).map((time) => (
            <TableCell key={`${day}-${time}`}>
              <div style={{ display: "flex" }}>
                <Checkbox
                  checked={isSelected({ day, time })}
                  onChange={() => handleCheckboxChange(day, time)}
                />
                {convertTimezone(new Date().setUTCHours(time, 0, 0, 0))}
              </div>
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell></TableCell> {/* Empty cell for spacing */}
          {workingTimes.slice(8, 16).map((time) => (
            <TableCell key={`${day}-${time}`}>
              <div style={{ display: "flex" }}>
                <Checkbox
                  checked={isSelected({ day, time })}
                  onChange={() => handleCheckboxChange(day, time)}
                />
                {convertTimezone(new Date().setUTCHours(time, 0, 0, 0))}
              </div>
            </TableCell>
          ))}
        </TableRow>
        {workingTimes.length > 16 && (
          <TableRow>
            <TableCell colSpan={16}></TableCell> {/* Empty cell for spacing */}
            {workingTimes.slice(16).map((time) => (
              <TableCell key={`${day}-${time}`}>
                <div style={{ display: "flex" }}>
                  <Checkbox
                    checked={isSelected({ day, time })}
                    onChange={() => handleCheckboxChange(day, time)}
                  />
                  {convertTimezone(new Date().setUTCHours(time, 0, 0, 0))}
                </div>
              </TableCell>
            ))}
          </TableRow>
        )}
      </React.Fragment>
    ))}
  </TableBody>
</Table>
    </div>
    </>
  );
}

export default TableForm;
