const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/ca1dca967d0148592e31867c2ab04001/' + latitude + ',' + longitude 
   
    request({url ,json:true},(error,{body}) => {
        if(error)
        {
            callback('Bro you got a network problem')
        }else if(body.error)
        {
            callback('bruh the place does not exist')
        }else{
            callback(undefined,
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' and chances of raining is ' + body.currently.precipProbability
            )
        }
    })
}

module.exports = forecast