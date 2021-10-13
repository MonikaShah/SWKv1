import {useState,useEffect} from 'react'
import {json} from 'd3-request';  // only for testing on dummy data
// import { parseInteger } from './util';

export const FetchData = () => {
    const [data,setData] = useState(null);
    useEffect(()=>{
        // const url = "https://gist.githubusercontent.com/AnimeshN/229fb500cc795975547231297b0e7773/raw/4f5e46b549c483fcdeb8cb5d520e6b1df346537d/3_month_dummy_swk_cleaned_v1.1.csv";
        let currentURL = window.location.href.split('/')
       
        // const url =  `${currentURL[0]}//${currentURL[2]}/trackid/`;
        const url=`https://swk.communitygis.net/trackid/`;
        const populationURL = `https://swk.communitygis.net/bubblepopulation/`;
        console.log(url)
         
        json(url,d=>{
            // const formattedData = parseInteger(d);
            json(populationURL,population =>{
                let res = {"track":d,"population":population};
                setData(res);
            })
        });
    },[])
    return data;
}

export const FetchGeom = () =>{
    const [geom,setGeom] = useState(null);
    useEffect(()=>{
        // const urlZones = "https://gist.githubusercontent.com/AnimeshN/29199ffdba88fd7b4345ec64b54af732/raw/d1821894029a3315adad5c9c2a6dca16fe375381/dummy_lane_polygon_v1.1.geojson";
//        const urlZones = "https://geonode.communitygis.net/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=geonode%3Aswk_13_zone_polygon&outputFormat=json&srs=EPSG%3A4326&srsName=EPSG%3A4326";
	    const urlZones ="https://gist.githubusercontent.com/MonikaShah/4740f99518fcb83a2e41e43b86683b31/raw/ce8e66f8b2f179cf5b337208815c7d27cc9b92ca/swk_13_zone_polygon"
	    
        const urlSpots = "https://gist.githubusercontent.com/MonikaShah/4740f99518fcb83a2e41e43b86683b31/raw/81597bd74d772a7f4650265262fcde19a0b7f560/worli_spot_updated_10march";

	    // const urlSpots = "https://geonode.communitygis.net/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=geonode%3Aworli_spot_updated_10march&outputFormat=json&srs=EPSG%3A4326&srsName=EPSG%3A4326"

        const urlBubble = "https://gist.githubusercontent.com/MonikaShah/4740f99518fcb83a2e41e43b86683b31/raw/81597bd74d772a7f4650265262fcde19a0b7f560/worli_bubble_updated_15march";

	    // const urlBubble = "https://geonode.communitygis.net/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typename=geonode%3Aworli_bubble_updated_15march&outputFormat=json&srs=EPSG%3A4326&srsName=EPSG%3A4326"

	    json(urlZones,zones=>{
            json(urlSpots,spots =>{
                json(urlBubble,bubble =>{
                    setGeom({"zones":zones,"spots":spots,"bubble":bubble});
                })
            })
        });
    },[])
    return geom;
}

