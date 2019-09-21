console.log('Client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data) => {
        console.log(data)
    })
    fetch("http://localhost:3000/weather?address=boston").then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                console.log(data.error)
            }
            else
            {
                console.log(data)
            }
        })
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    console.log('testing!')
    message2.textContent = ""
    message1.textContent = "Loading................"
    const location = search.value
    console.log(location)
    fetch('/weather?address='+location).then((response) => {
        response.json().then((dataa) => {
            if(dataa.error)
            {
                console.log(dataa.error)
                message1.textContent = dataa.error
            }
            else
            {
                console.log(JSON.stringify(dataa.data))
                message1.textContent = "The temprature in your area is : "+dataa.data.temperature
                message2.textContent = dataa.place
            }
        })
    })
    
})
