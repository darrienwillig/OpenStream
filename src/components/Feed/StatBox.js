import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function StatBox ({fakeVolume}) {

  return (
    <>
    {
      fakeVolume &&
        fakeVolume.map((item, index) => {
          return (
            <List key={index} sx={{border: '.5px solid #1e4976', width: '85%'}}>
            <ListItem disablePadding sx={{paddingLeft: '9%'}} >
              <ListItemText primary={item.name} primaryTypographyProps={{fontSize: '12px', fontWeight: 'bold'}}  />
            </ListItem>
            <ListItem disablePadding sx={{paddingLeft: '14%'}} >
              <ListItemIcon  style={{color: 'white', minWidth: '0'}}>
                <SignalCellularAltIcon  />
              </ListItemIcon>
              <ListItemText  primaryTypographyProps={{fontSize: 'medium'}} primary={`${item.onedaysales.toLocaleString('en-us', {maximumFractionDigits: 1})} Ξ`} />
            </ListItem>
            <ListItem  sx={{paddingLeft: '14%'}}>
              <ListItemIcon style={{color: 'white', minWidth: '0'}}>
                <SignalCellularAltIcon />
              </ListItemIcon>
              <ListItemText  primaryTypographyProps={{fontSize: 'medium'}} primary={`${item.totalsales.toLocaleString('en-us', {maximumFractionDigits: 1})} Ξ`} />
            </ListItem>
            <ListItem  sx={{paddingLeft: '14%'}}>
              <ListItemIcon style={{color: 'white', minWidth: '0'}}>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText  primaryTypographyProps={{fontSize: 'medium'}} primary={` ${item.floor.toLocaleString('en-us', {maximumFractionDigits: 2})} Ξ`} />
            </ListItem>
          </List>
          )
        })
    }
    </>
  )
}