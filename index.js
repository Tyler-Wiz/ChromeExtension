
const Wkey = weatherApi.MY_API_TOKEN
const Ukey = unsplashApi.MY_API_TOKEN

window.addEventListener('load', () => {
    async function getPhoto() {
        const res = await fetch("https://api.unsplash.com/photos/random?&topic=Nature&count=1&orientation=landscape&client_id=q9kxKV1p-GYkh0_O9Tpb1GOT3e_Zo2Xis61TwSqmeDQ")
        if(res.ok){
            const data = await res.json()
            return data 
        } else {
            throw new Error("Image is not defined");
        }  
    } 
    getPhoto().then(data => {
           let image = data[0].urls.regular
           let author = data[0].user.name
           console.log(data[0])
           document.body.style.backgroundImage = ` url("${image}")`
           document.querySelector('.author').innerHTML = `Author: ${author}`
        }).catch(error => {
            console.log(error)
        })
    
    
    async function randomQuote() {
        const response = await fetch('https://api.quotable.io/random?maxLength=50')
        const data = await response.json()
        return data
      } randomQuote().then(data => {
        let quote = data.content
        let author = data.author
        document.querySelector('.quote').innerHTML = 
        `
        <div>
        <h4>${quote}</h4> 
        <p class="quote_author">- ${author}</p> 
        </div> `
      })

    
    async function getDayWeather(){
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=lagos&units=metric&appid=${Wkey}`)
        const data = await res.json()
        return data
    } getDayWeather().then(data => {
        let temperature = Math.floor(data.main.temp) + '°C'
        let icon = data.weather[0].icon
    
      document.querySelector('.weather').innerHTML = ` 
      <div class="inside_weather">
        <img src = "https://openweathermap.org/img/wn/${icon}@2x.png">
        <h1>${temperature}</h1>
      </div>
    `
    })
})



const timeCount = () => {
    let time = new Date()
    let currentTime = time.toLocaleTimeString("en-US", {timeStyle: "short"}) 
    document.querySelector('.time').innerHTML = `<h1>${currentTime}</h1>`
}
setInterval(timeCount, 1000);
