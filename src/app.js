const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Defin Path for Express config
const publicdirpathtemp= path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')//dot dot to go up a directory.This is also used to change some default settings
const partialsPath = path.join(__dirname,'../template/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)//this is for handlebars
//Setup static directory to serve
app.use(express.static(publicdirpathtemp))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather ',
        name:'Shantanu shukla'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me ',
        name:'Shantanu shukla'
    })      
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Shantanu Shukla'
    })
})

app.get("/weather",(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'Thou shall must provide a location'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){ 
            return res.send({
                error
            })
        }
        
        forecast(latitude,longitude,(error,forecastdata) => {
    
        if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastdata,location,
                address:req.query.address
            })
        })
        
    })
    
})



app.get('/products',(req,res) =>{
    if(!req.query.search){
       return  res.send({
           error:'Thou shall provide a search term'
       })
    }
    
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res) => {
      res.render('404',{
          title:'404',
          name:'Shantanu shukla',
          errorMessage:'Help Article Not Found'

      })
})

app.get('*',(req,res) => {
      res.render('404',{
          title:'404',
          name:'Shantanu shukla',
          errorMessage:'Page not found'
      })
})

app.listen(3000, () => {
    console.log('server is up on the port 3000')
})


//express is a funtion
//console.log(__dirname)//contain path to the directory the current scripts lives in
//console.log(__filename)//contain path to the directory the current file lives in 
//console.log(path.join(__dirname,'../public'))