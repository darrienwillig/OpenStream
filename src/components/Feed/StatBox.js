import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
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
              <ListItemText primary={item.collection} primaryTypographyProps={{fontSize: '12px', fontWeight: 'bold'}}  />
            </ListItem>
            <ListItem disablePadding sx={{paddingLeft: '14%'}} >
              <ListItemIcon  style={{color: 'white', minWidth: '0'}}>
                <SignalCellularAltIcon  />
              </ListItemIcon>
              <ListItemText  primary={`${item.onedaysales} Ξ`} />
            </ListItem>
            <ListItem  sx={{paddingLeft: '14%'}}>
              <ListItemIcon style={{color: 'white', minWidth: '0'}}>
                <SignalCellularAltIcon />
              </ListItemIcon>
              <ListItemText  primary={`${item.totalsales} Ξ`} />
            </ListItem>
          </List>
          )
        })
    }
    </>
  )
}