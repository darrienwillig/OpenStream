import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from 'react'

export default function StatBox ({currentVolume}) {
  const [isLoaded, setLoaded] = useState(false)
  currentVolume = currentVolume ? currentVolume : JSON.parse(window.localStorage.getItem('currentVolumes'))

  return (
    <>
    {
      currentVolume.length > 0 ?
        currentVolume.map((item, index) => {
          return (
            <List key={index} sx={{border: '.5px solid #1e4976', width: '85%'}}>
            <ListItem disablePadding sx={{paddingLeft: '9%'}} >
              <ListItemText primary={item.name} primaryTypographyProps={{fontSize: '12px', fontWeight: 'bold'}}  />
            </ListItem>
            <ListItem disablePadding sx={{paddingLeft: '14%'}} >
              <ListItemIcon  style={{color: 'white', minWidth: '0'}}>
                <SignalCellularAltIcon sx={{color: '#EB455F'}} />
              </ListItemIcon>
              <ListItemText  primaryTypographyProps={{fontSize: 'medium'}} primary={`${item.onedaysales.toLocaleString('en-us', {maximumFractionDigits: 4})} Ξ`} />
            </ListItem>
            <ListItem  sx={{paddingLeft: '14%'}}>
              <ListItemIcon style={{color: 'white', minWidth: '0'}}>
                <SignalCellularAltIcon sx={{color: '#EB455F'}}/>
              </ListItemIcon>
              <ListItemText  primaryTypographyProps={{fontSize: 'medium'}} primary={`${item.totalsales.toLocaleString('en-us', {maximumFractionDigits: 4})} Ξ`} />
            </ListItem>
            <ListItem  sx={{paddingLeft: '14%'}}>
              <ListItemIcon style={{color: 'white', minWidth: '0'}}>
                <MonetizationOnIcon sx={{color: '#EB455F'}}/>
              </ListItemIcon>
              <ListItemText  primaryTypographyProps={{fontSize: 'medium'}} primary={` ${item.floor.toLocaleString('en-us', {maximumFractionDigits: 4})} Ξ`} />
            </ListItem>
          </List>
          )
        })
        :   <Box sx={{ display: 'flex', width: '85%', height: '50vh', justifyContent: 'center', alignItems: 'center' }}>
                  <CircularProgress sx={{color: '#EB455F'}}/>
        </Box>
    }
    </>
  )
}