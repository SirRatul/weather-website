const request = require('request');

const geocode = (address, callback) => {
    setTimeout(() => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmVsYWxhbiIsImEiOiJjazd1aXV3bXowMXA5M2xwNXgzZWwwMmQ0In0.MzNMw0Wed8mvvoWqIsQ6fA&limit=1'

        /* request({ url: url, json: true}, (error, response) => {
            if(error){
                callback('Unable to connect to location service!',undefined)
            } else if(response.body.message){
                callback('Unable to find location. You should enter a location.',undefined)
            } else if(response.body.features.length === 0){
                callback('Unable to find location. Try another search.',undefined)
            } else {
                callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name,
                })
            }
        }) */

        request({url, json: true}, (error, {body}) => {
            if(error){
                callback('Unable to connect to location service!',undefined)
            } else if(body.message){
                callback('Unable to find location. You should enter a location.',undefined)
            } else if(body.features.length === 0){
                callback('Unable to find location. Try another search.',undefined)
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name,
                })
            }
        })
    }, 2000)
}

/* const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoibmVsYWxhbiIsImEiOiJjazd1aXV3bXowMXA5M2xwNXgzZWwwMmQ0In0.MzNMw0Wed8mvvoWqIsQ6fA&limit=1'

request({ url: geocodeURL, json: true}, (error, response) => {
    if(error){
        console.log('Unable to connect to location service!')
    } else if(response.body.message){
        console.log('Unable to find location. You should enter a location.')
    } else if(response.body.features.length === 0){
        console.log('Unable to find location. Try another search.')
    } else {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log('Latitude:'+latitude+' Longitude:'+longitude)
    }
}) */

module.exports = geocode