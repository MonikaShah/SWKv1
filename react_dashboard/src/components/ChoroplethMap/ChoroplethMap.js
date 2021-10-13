import React,{useEffect, useRef,useState} from 'react'
import { Map, TileLayer , GeoJSON,LayersControl} from "react-leaflet";
import Control from 'react-leaflet-control';

import "./ChoroplethMap.css";
import { groupDataByCategory, mergeGeomData , groupDataByDateCategory,getDays,getMonth,getYear} from "./../util";
import { scaleSequential } from "d3-scale";
import { interpolateRdYlGn} from "d3-scale-chromatic";
import {select} from "d3-selection";
import { legendColor } from 'd3-svg-legend'
import {format} from 'd3-format'

import {extent} from 'd3-array'
//import * as d3 from 'd3';

import 'd3-transition'
import L from 'leaflet';
// import { sliderLeft, sliderVertical } from 'd3-simple-slider';
import {FormControl,InputLabel,MenuItem, Select,Slider,Typography} from '@material-ui/core'
// import * as d3 from 'd3';
import { sliderLeft, sliderVertical } from 'd3-simple-slider';





function ChoroplethMap({geojson,data,bubblePopulationData,setSelLane,selCategory}) {
    const geoJsonRef = useRef();
    const dataByCategory = groupDataByCategory(data,selCategory);
    const [zoneControl,setZoneControl] = useState(false);
    const svgLegRef = useRef();

    const zonePopulation = bubblePopulationData.reduce((obj,elem)=>{
        let category = elem["zone_id"];
        if(!obj.hasOwnProperty(category))
            obj[category] = 0;
        obj[category] += elem["bubble_population"]
        return obj;
    },[])
    
    
  

   
      
    
    const [selDay, setSelDay] = useState(1);
    const [selYear, setSelYear] = useState('2021');
    var [selMonth, setSelMonth]=useState('03');

    // defaultmonth(selYear);
    // function defaultmonth(data) {
    //     console.log(data)
        // if(selYear==='2020'){  setSelMonth('10');}
        // else if(selYear==='2021'){  setSelMonth('01');}
    //   }
    const dataByDateCategory = groupDataByDateCategory(data,selCategory,selYear,selMonth,selDay)
    const geojsonWithData = mergeGeomData(geojson.zones,dataByDateCategory,zonePopulation);
    
    const domain = []
        // for( let key in dataByDateCategory){
        //     domain.push(dataByDateCategory[key])
        //     console.log(domain)
        // }

    geojsonWithData.features.map(feature =>{
        domain.push(feature.properties.perCapita);
    })
    const [min,max] = extent(domain);

    let colorScale= scaleSequential().domain([max,min]).interpolator(interpolateRdYlGn);
  
    let legend = select("#svg-color-scale")
    legend.append("g")
    .attr("class", "svg-color-legend")
    .attr("transform", "translate(50,20)");
    let newtitle;
    if(selCategory=='dry'){
      newtitle=`Recyclable Dry Waste`
    }
    else if(selCategory=='wet'){
      newtitle=`Compostable Wet Waste`
    }
    else if(selCategory=='rejected'){
        newtitle=`Seggregated Rejected Waste`
      }
    let colorLegend = legendColor()
        .labelFormat(format(".2f"))
        .title(`Legend:${newtitle}(Kgs/capita)`)
        .scale(colorScale);

    

    legend.select(".svg-color-legend").call(colorLegend);




const zoneStyle = (e) =>{
    if(typeof e.properties.dataValue !== "undefined")
    return { fillColor:colorScale(e.properties.perCapita), color:"black" }
    else
    return { fillColor:"black",color:"black" }
}
const spotsStyle = { color: 'red',fill:'black',color:"black" }


const onEachSpot = (spot,layer) =>{

}
const onEachLane = (lane,layer) =>{
    // geoJsonRef.current.leafletElement.resetStyle(layer);
    // if(geoJsonRef.current){
    //     console.log(geoJsonRef.current)
    // }


const setDataValue = value =>{
    if(typeof value !== "undefined")
        return `<h1 class="text-center">${value} Kg per capita</h1>`
    else    
        return `<h5 class="text-center">Data not Found</h5>`
}
layer.options.fillOpacity = .8;


layer.on({
    click: e => {
        let zone_id = e.target.feature.properties.zone_id;
        console.log(zone_id)
        // if(zone_id !== 'zone_4' && zone_id !=='zone_5' && zone_id !== 'zone_9' && zone_id !=='' )
        if(zone_id !=='' )
            setSelLane(zone_id)
    },
    mouseover: e => {
       L.popup()
        .setLatLng(e.latlng)
        .setContent(`<b>${e.target.feature.properties.zone_name}</b> <hr> ${setDataValue(e.target.feature.properties.perCapita)}<br>Total Population:${e.target.feature.properties.population}<br>Total Waste:${e.target.feature.properties.dataValue}Kg`)
        .openOn(layer._map);
    },
    mouseout: e=> layer._map.closePopup()
    });

}

const pointToLayer = (feature,latlong) =>{
    return L.circleMarker(latlong, {radius:5});
}

const showZoneControl = (e)=>{
    if(e.name === 'Zones')
        setZoneControl(true)
}

const removeZoneControl = (e) =>{
    if(e.name === 'Zones')
        setZoneControl(false)
}


function valuetext(value) {
    setSelDay(value)    
    return value;
  }

let zoneControlDiv;
if(true){
    zoneControlDiv =  <Control position="bottomleft" className="legend-div">

    <div className="info">
        <h4 style={{fontSize:"15px",fontWeight:"bold"}}>Click on polygon to select lane</h4>
    </div>
    <svg className = "svg-legend" ref={svgLegRef} id="svg-color-scale" style={{fontSize:"13px"}}></svg>
    

</Control>
}else{
    // zoneControlDiv
}
       
let geojsonMap =  <GeoJSON key='my-geojson' style={zoneStyle} data={geojsonWithData} onEachFeature={onEachLane}  />

const handleDropdownChange = (e) =>{
    setSelMonth(e.target.value)
}
const handleYearDropdownChange = (e) =>{
    setSelYear(e.target.value)
    if (e.target.value==='2021') {
setSelMonth('02');  
    }
    else{setSelMonth('01')}
}
const monthName = {'09':'Sep','10':'Oct','11':'Nov','12':'Dec','01':'Jan','02':'Feb','03':'Mar','04':'April','05':'May','06':'June','07':'July','08':'Aug'}; 

let menuItems =<Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={selMonth}
        onChange={handleDropdownChange}
        label="Month"
        className="month-drop"
        >
        <MenuItem value="">
            <em>None</em>
        </MenuItem>
        {getMonth(data,selYear).map((month)=>{
             return <MenuItem value={month}>{monthName[month]}</MenuItem>
        })
        }
         
       
    </Select>
    let days=[];

 

  let minimumDay = Math.min(...getDays(data,selYear,selMonth));
  let maximumDay = Math.max(...getDays(data,selYear,selMonth));
   let day; 
  for(day = minimumDay;day<=maximumDay;day++){
    if(day%3==0)

    days.push({value:day,label:day.toString()});
  }
return (
    <div className="map">

   {/* <div className="map__choropleth"> */}
    <Map center={[19.0202, 72.8168]} zoom={16.5} scrollWheelZoom={false} onOverlayadd={ showZoneControl } onoverlayremove={ removeZoneControl }>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    <Control position="topright">
        <FormControl variant="filled" >
            <InputLabel id="demo-simple-select-filled-label">Select Year</InputLabel>
            <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selYear}
                    onChange={handleYearDropdownChange}
                    label="Year"
                    className="year-drop"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        getYear(data).map(year =>{
                            return <MenuItem value={year}>{year}</MenuItem>
                        })
                    }
                   
                </Select>    
                
                    {menuItems}
              
               
    </FormControl>
    </Control>
    <Control position="bottomright">
    <Typography id="discrete-slider-small-steps" gutterBottom>
        Select Day
      </Typography>
    <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={1}
          aria-labelledby="vertical-slider"
          style={{height:300}}
          valueLabelDisplay="on"
          step={1}
          min={minimumDay}
          max={maximumDay}
          marks={days}
        />
    </Control>
    {zoneControlDiv}

    {/* <TileLayer
      attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    /> */}
        
        <LayersControl position="topright">
            
            <LayersControl.BaseLayer name="Default">
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Grey scale">
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>


            <LayersControl.Overlay name="Spots">
                <GeoJSON key='my-geojson' style={spotsStyle} data={geojson.spots} pointToLayer={pointToLayer} onEachFeature={onEachSpot}/>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Zones"  >
              
            {geojsonMap}

                {/* <FeatureGroup >
                    
                </FeatureGroup> */}
            </LayersControl.Overlay>
            </LayersControl>


    </Map>

    {/* </div> */}
    {/* <div className="map__slider"></div> */}

    </div>
)
}

export default ChoroplethMap


// geonode:worli_bubble_updated_15march
// geonode:worli_spot_updated_10march