const request=require('request')

const geocode = (address,callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhbnRhbnU2OSIsImEiOiJjazh0bWUyN3kwMTR0M3JvN2g4M2loajBrIn0.tFmay9iuNR0ZOxB2cnb-qw'

    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
           callback('bro you got network problem')
        }else if(body.features.length===0){
            callback('bro you got a uncanny up input')
        }else{
             callback(undefined,{
                latitude:body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:body.features[0].place_name
             })
        }
    })
}

module.exports= geocode