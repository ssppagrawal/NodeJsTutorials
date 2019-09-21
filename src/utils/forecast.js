const request = require('request')

const forecast = ({latitude , longitude},callback) =>{
const url ='https://api.darksky.net/forecast/da2e74b4d52fe4b62128bf5aa74a81f8/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si&lang=es'

request({url, json:true} , (error , {body}) => {
    if(error)
    {
        callback("Unable to conect to local services!" , undefined)
    }
    else{
        if(body.error)
        {
            callback("bad request" , undefined)
        }
        else
        {
            callback(undefined , body.currently)
        }
    }
})
}

module.exports = forecast