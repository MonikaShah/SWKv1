import _ from 'lodash';


const colName = {'dry':'drywaste_af','wet':'wetwaste_af','rejected':'rejected'};

export const parseInteger = (data) =>{
    const dataColumns = ['rejected','drywaste_af','drywaste_bf','num_houses_doing_segg','num_houses_giving_mixwaste','num_houses_reached','wetwaste_af','wetwaste_bf'];
    dataColumns.map(col =>{
        _.each(data, item => item[col] = parseInt(item[col], 10));

    })
    return data;
}



export const getYear = (data) =>{
  let years = [];
  data.map(d => {
      let date = d.date.split("-");
      if(!(years.includes(date[0])))
          years.push(date[0]);
  });
  return years;
}

export const getMonth = (data,year) =>{
  let months = [];
  data.map(d =>{
      let date = d.date.split("-");
      if(date[0] == year){
          if(!months.includes(date[1]))
              months.push(date[1]);
      }
  })
  return months;
}

export const getDays = (data,year,month) =>{
  let days = [];
  data.map(d =>{
      let date = d.date.split("-");
      if(date[1] == month && date[0]==year){
          if(!days.includes(+date[2]))
              days.push(+date[2]);
      }
  })
  return days;
}

export let ZONES = [];
export const getDropdownLanes = (data) =>{
    const zones_with_id = data.map(d => {
      let temp = {};
      temp['lane_name'] = d.lane_name;
      temp['zone_id'] = d.zone_id;
      return temp
    })
    // const lanes = _.map(data,'lane_name','date')
    // console.log(lanes)
    const uniqueLanes = _.uniqBy(zones_with_id,d=>d.zone_id);
    ZONES = [{'zone_id':'all','lane_name':'All'},...uniqueLanes];
    return uniqueLanes;
} 
export const calcTotalWaste = (data,selLane,cases) =>{
    let totWaste,caseCol;
    if(selLane ==='all'){
        caseCol = _.map(data,cases)
       
    }else{
        let selLaneData= data.filter(d => d.zone_id === selLane)
        caseCol = _.map(selLaneData,cases)
    }
    totWaste =  _.sum(caseCol);
    return totWaste;
}

const monthName = {'09':'Sep','10':'Oct','11':'Nov','12':'Dec','01':'Jan','02':'Feb','03':'Mar','04':'April','05':'May','06':'June','07':'July','08':'Aug'}; 

export const calMonthlyData = (data,selLane,selCategory) =>{
  const yaxis = {};
  const colName = {'dry':'drywaste_af','wet':'wetwaste_af','rejected':'rejected'};
  let yearMonth = {};
  getYear(data).map(year =>{
    yearMonth[year] = [];
    getMonth(data,year).map(month =>{
      yaxis[month] = `${monthName[month]}-${year}`
      yearMonth[year].push(month);
    })
  })
  let selLaneData;
  if(selLane === 'all')
      selLaneData = data;
  else 
      selLaneData = data.filter(d => d.zone_id === selLane)
  

  let groupedData = selLaneData.reduce((obj,elem)=>{
      let category = elem.date.split('-')[1];
      if(!obj.hasOwnProperty(category))
          obj[category] = 0;
      
      obj[category] += elem[colName[selCategory]];
      return obj;
  },[])
  
    delete groupedData["09"]; // hack not perfect solution
 
    let calcLabels = [];
    let calcData = [];
    // console.log(groupedData);
    for(let key in groupedData){
        // console.log(month2[key]);
        calcLabels.push(yaxis[key]);
        calcData.push(groupedData[key]);
    }
  //   for(let key in month){
  //     console.log(key);
  // }
    const barData = {
        chartData:{
          labels: calcLabels,
          datasets:[
            {
              label:`${selCategory} waste`,
              data:calcData,
              backgroundColor:'rgba(144, 238, 144, 0.6)'
            }
          ]
        }
      };
    return barData;
}


const createLabel = (oldArr,maxVal) =>{
    let arr = []
    let delta = Math.floor( oldArr.length / maxVal );

    for (let i = 0; i < oldArr.length; i=i+delta) {
        arr.push(oldArr[i]);
      }
      return arr;
}

export const calcDailyData = (selLanedata,selCategory) =>{
    const colName = {'dry':'drywaste_af','wet':'wetwaste_af','rejected':'rejected'};
    const catData = _.map(selLanedata,colName[selCategory])
    const date = _.map(selLanedata,'date')
    const MAXVAL = 15;
    const xAxisLabel = createLabel(date,MAXVAL)
    
    const lineData = {
        chartData:{
          labels: xAxisLabel,
          datasets:[
            {
              label:`${selCategory} waste`,
              data:catData,
              fill: false,
              backgroundColor:'lightgreen',
              borderColor:'lightgreen',
              pointBackgroundColor:'grey'
            }
          ]
        }
      };
    return lineData;
}

export const sliceLaneData = (data,selLane) =>{
    if(selLane === 'all')
        return data;
    else
        return data.filter(d => d.zone_id === selLane);
}


export const groupDataByCategory = (data,selCategory) =>{
    const dataByCategory = data.reduce((obj,elem)=>{
      let category = elem["lane_name"];
      if(!obj.hasOwnProperty(category))
          obj[category] = 0;
      obj[category] += elem[colName[selCategory]]
      return obj;
  },[])

  return dataByCategory;
}


// export const mergeGeomData = (geojson,dataByCategory) =>{ 
//   const features = geojson.features;
//   for(let key in features){
//     let laneName = features[key].properties.name;
//     features[key].properties['dataValue'] = dataByCategory[laneName];
//   }

//   return geojson;
  
// }

export const mergeGeomData = (geojson,dataByCategory,zonePopulation) =>{ 
  const features = geojson.features;
  for(let key in features){
    let zone_id = features[key].properties.zone_id;
    for(let z in dataByCategory){
      if (z === zone_id)
        features[key].properties['dataValue'] = dataByCategory[z]; 
    }
    //adding population

    for(let p in zonePopulation){
      if(p === zone_id)
        features[key].properties['population'] = zonePopulation[p];
        features[key].properties['perCapita'] = +(features[key].properties.dataValue/features[key].properties.population).toFixed(3);
    }

    // if(dataByCategory.length>0){   //if dataBycategory is not empty
    //   console.log(dataByCategory)
    //   let value = dataByCategory.filter(obj => {
    //     if(obj[zone_id])
    //       return (obj) 
    //   })



    //   console.log(value,"value") 
  
    //   value = (Object.values(value[0])[0])
  
    //   features[key].properties['dataValue'] = value; 
    // }
    console.log(geojson)
  }
  return geojson;
  
}


// const sliceCategoryData = (data,selCategory) =>{
//   data.filter(d => data.)
// }
export const groupDataByDateCategory = (data,selCategory,selYear,selMonth,selDay) =>{
  // let date = `${selDay}/${selMonth}/20`; 
  selDay = ((""+selDay).length === 1)?"0"+selDay:selDay;
  // selDay=30
  let date = `${selYear}-${selMonth}-${selDay}`; 
  // data.map(d=>console.log(d.date))
  let newData = data.filter(d => d.date === date).map(d => {
    const obj={}
    obj[d.zone_id] = d[colName[selCategory]]
    return obj
  })

  //if data is repeated in table then remove this----later when form gets updated will remove this condition
  newData = newData.reduce((obj,elem)=>{
    let category = Object.keys(elem)[0];
    if(!obj.hasOwnProperty(category))
        obj[category] = 0;
    
    obj[category] += Object.values(elem)[0];
    return obj;
},[])
  return newData

}
