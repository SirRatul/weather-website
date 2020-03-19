const request = require('request');

const forecast = (latitude, longitude, callback)  => {
    setTimeout(() => {
        // const url = 'https://api.darksky.net/forecast/cc4784912846f9be89cffcce6ce4d1b9/37.8267,-122.4233?key=value&otherKey=otherValue'
        // const url = 'https://api.darksky.net/forecast/cc4784912846f9be89cffcce6ce4d1b9/37.8267,-122.4233?units=us'
        // const url = 'https://api.darksky.net/forecast/cc4784912846f9be89cffcce6ce4d1b9/37.8267,-122.4233?units=si'
        // const url = 'https://api.darksky.net/forecast/cc4784912846f9be89cffcce6ce4d1b9/37.8267,-122.4233?lang=es'
        // const url = 'https://api.darksky.net/forecast/cc4784912846f9be89cffcce6ce4d1b9/37.8267,-122.4233?lang=es&units=si'
        //const url = 'https://api.darksky.net/forecast/cc4784912846f9be89cffcce6ce4d1b9/37.8267,-122.4233'
        const url = 'https://api.darksky.net/forecast/cc4784912846f9be89cffcce6ce4d1b9/'+latitude+','+longitude+'?units=si'

        /* request({ url: url, json: true}, (error, response) => {
            if(error){
                console.log('Unable to connect to weather service!')
            } else if(response.body.error){
                console.log('Unable to find location')
            } else {
                // const data = JSON.parse(response.body)
                // console.log('It is currently '+response.body.currently.temperature+' degrees out. There is a '+response.body.currently.precipProbability+'% chance of rain.')
                console.log(response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degrees out. There is a '+response.body.currently.precipProbability+'% chance of rain.')
            }
        }) */

        /* request({ url: url, json: true}, (error, response) => {
            if(error){
                callback('Unable to connect to weather service!',undefined)
            } else if(response.body.error){
                callback('Unable to find location',undefined)
            } else {
                callback(undefined, response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degrees out. There is a '+response.body.currently.precipProbability+'% chance of rain.')
            }
        }) */

        request({url, json: true}, (error, {body}) => {
            if(error){
                callback('Unable to connect to weather service!',undefined)
            } else if(body.error){
                callback('Unable to find location',undefined)
            } else {
                callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. This high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow+'. There is a '+body.currently.precipProbability+'% chance of rain.')
            }
        })
    }, 2000)
}

module.exports = forecast