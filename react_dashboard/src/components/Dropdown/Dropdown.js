import React from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core';
import {getDropdownLanes} from '../util';
import './Dropdown.css';

 
export default function Dropdown({data, selLane,setSelLane}) {
    const zones = getDropdownLanes(data);
    return (
        
        <FormControl className="dropdown1">
          <Select id="lane-dropdown" variant="outlined" value={selLane} onChange={e=>{setSelLane(e.target.value)}}>
            <MenuItem key='all' value="all">All</MenuItem>
            {zones.map(zone =>(
               <MenuItem key={zone.zone_id} value={zone.zone_id}>{zone.lane_name}</MenuItem> 
            ))}
               {/* <MenuItem key={zone.zone_id} value={zone.zone_id}>{zone.lane_name}</MenuItem>  */}
               {/* <MenuItem key="Nagoba Ghumat- Achanak" value="Nagoba Ghumat- Achanak" disabled={true} >Nagoba Ghumat- Achanak</MenuItem> 
               <MenuItem key="Golfadevi" value="Golfadevi" disabled={true} >Golfadevi</MenuItem> 
               <MenuItem key="Sonapur - Dukkur Galli" value="Sonapur - Dukkur Galli" disabled={true} >Sonapur - Dukkur Galli</MenuItem>  */}
          </Select>
      </FormControl>
    )
}
