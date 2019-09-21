const express = require('express') // express is a single functions
const path = require('path')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode.js')
const forecast = require('../src/utils/forecast.js')

console.log(path.join(__dirname, '../public' ))
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')


const app = express() // we createed our application

app.set('view engine','hbs')
app.set('views' , viewsPath )
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname , '../public')))

// app.get('' , (request , response ) => {
//     response.send('Hello express!')
// })

// app.get('/help' , (req , res) => {
//     res.send('Help Page')
// })

// app.get('/about' , (req , res) => {
//     res.send('about page')
// })

app.get('',(req,res)=>{
    
    res.render('index' ,  {
        title:'Weather App',
        name: 'SAURABH AGRAWAL'
    })
})

app.get('/weather', (req,res) =>{

    var realData 
    if(!req.query.address)
    {
        return res.send({    // There is a reason behind writing this return because we cannot send response twice
            error: ' you must provide the address'
        })
    }
    geocode(req.query.address , (error,data) =>{
        if(error)
        {
            return res.send({error:error})
        }
        else
        {
            console.log(data)
            forecast(data,(error,data2)=>{
                if(error)
                {
                    return res.send({error:error})
                }
                else
                {
                    res.send({
                        data:data2,
                        place : data.location
                    })
                }
            })
        }
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title: 'About Me ',
        name: 'SAURABH AGRAWAL'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' ,{
        helpText: 'Jo man wo ham help text me daal sakte',
        title: 'Help',
        name: 'SAURABH AGRAWAL'
    })
})

app.get('/products' , (req , res) =>{
    
    if(!req.query.search)
    {
        return res.send({    // There is a reason behind writing this return because we cannot send response twice
            error: ' you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req , res) => {
    res.render('pageNotFound' , {
        error: 'Help Article Not Found',
        title: '404',
        name: 'SAURABH AGRAWAL'
    })
})

app.get('*',(req , res) => {
    res.render('pageNotFound',{
        error: 'My 404 page',
        title: '404',
        name: 'SAURABH AGRAWAL'
    })
})

app.listen(3000 , () => {
    console.log('The sever did started correctly on port 3000.')
})