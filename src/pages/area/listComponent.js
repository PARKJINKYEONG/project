import {List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
export function ListComponent({listNames, listLinks}){
    if(listLinks == null)
        listLinks = [];
    return <>
        <List>
            {listNames.map((text, index) => (
            <Link to={listLinks[index]} style={{color: "black", textDecoration: 'none'}}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              </Link>
            ))}
        </List>
    </>
}