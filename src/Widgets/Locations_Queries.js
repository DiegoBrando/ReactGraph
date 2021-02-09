//All Location Queries
//All require a pool to work
const pools=require('../../Constants/pools.js')
const rm=require( 'ramda');

//Requires no inputs
//Returns all location information minus deals
exports.GetAllLocations=(pool)=>{
    return pool.query('Select * from Locations;').then(result=>result.rows)
};


//Requires a name in string format that maps to locationname
//Returns all information for a location
exports.GetLocationbyName=(pool,locationname)=>{
    return pool.query('Select * from Locations where locationname=$1;',[locationname]).then(result=>result.rows)
};


//Requires an locationid in graphqlID format
//Returns all information for a location
exports.GetLocationByLocationID=(pool,locationid)=>{
    return pool.query('Select * from Locations where LocationID=$1;',[locationid]).then(result=>result.rows)
};


//Requires a latitude as float, longitude as float, x for the number of locations, transform for the distance format, and offset in int
//Returns all information for a location minus deals and adds the distance from the location in whatever format as the transform
exports.GetXClosestLocations=(pool,latitude,longitude,x,transform,offset)=>{
  return pool.query("Select L.locationid,L.locationname,L.latitude,L.longitude,CAST(L.GEOID as varchar(1000)),ST_Distance(ST_Transform(L.geoid::geometry,"+transform+"), ST_Transform('SRID="+transform+";POINT("+latitude+" "+longitude+")'::geometry,"+transform+")) as Distance from Locations L ORDER BY ST_Distance(ST_Transform(L.geoid::geometry,2163),'SRID="+transform+";POINT("+latitude+" "+longitude+")') ASC LIMIT $2 OFFSET $1;",[offset,x]).then(result=>result.rows)
};


//Requires a latitude as float, longitude as float, id in id format, and transform for the distance format
//Returns all information for a location minus deals and adds the distance from the location in whatever format as the transform
exports.GetLocationDistanceByID=(pool,locationid,latitude,longitude,transform)=>{
  return pool.query("Select L.locationid,L.locationname,L.latitude,L.longitude,CAST(L.GEOID as varchar(1000)),ST_Distance(ST_Transform(L.geoid::geometry,"+transform+"), ST_Transform('SRID="+transform+";POINT("+latitude+" "+longitude+")'::geometry,"+transform+")) as Distance from Locations L;").then(result=>result.rows)
};
