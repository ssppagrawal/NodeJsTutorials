const request = require('request')

const geocode = (address , callback) =>{
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)/*this function is used if the string contains any special charachter*/ +".json?access_token=pk.eyJ1Ijoic3NwcGFncmF3YWwiLCJhIjoiY2swYWZsbzRpMGhnajNkbXFwMjU4aGY0aiJ9.Xdk3Oy7CzQXRoOBI6MzY0Q&limit=1"
    request({url:geocodeURL , json:true} , (error , {body}) => {
        if(error)
        {
            callback("Unable to conect to local services!",undefined)
        }
        else if(body.features.length == 0){
                        callback("Unable to find location" , undefined)
        }
        else
        {
            callback(undefined , {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name})
                console.log(body.features[0].place_name)
        }
    })
}

module.exports = geocode