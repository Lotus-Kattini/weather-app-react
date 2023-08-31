import React from 'react'
import {BsSearch} from 'react-icons/bs'
import './style.css'
import axios from 'axios'
import {WiHumidity} from 'react-icons/wi'
import {FiWind} from 'react-icons/fi'
import { useState } from 'react'


function Home() {
  const [data,setdata]=useState({
    celcuis:0,
    name:"london",
    humidity:0,
    speed:2,
    image:'./images/cloud.png'

  })

  const [name,setname]=useState('')
  const [validname,setvalidname]=useState('')
  const clickHandler =()=>{
    if(name !==''){
      const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c5f7c73247b04ebed4918f9ef4a23da3&&units=metric`
      axios.get(apiUrl)
      .then(res => {
        let imgPath=''
        if(res.data.weather[0].main=='Clouds'){
          imgPath='./images/cloud.png'
        }
        else if(res.data.weather[0].main=='Rain'){
          imgPath='./images/raniny.png'
        }
        else if(res.data.weather[0].main=='Drizzle'){
          imgPath='./images/sun-rain.png'
        }
        else if(res.data.weather[0].main=='Mist'){
          imgPath='./images/sun-cloud.png'
        }
        else if(res.data.weather[0].main=='Clear'){
          imgPath='./images/sunny.png'
        }
        else{
          imgPath='./images/cloud.png'
        }
        console.log(res.data)
        setdata({...data, celcuis:res.data.main.temp,name:res.data.name,
        humidity:res.data.main.humidity,speed:res.data.wind.speed, image:imgPath})
        setvalidname('')
      })
      .catch(err=> {
        if(err.response.status==404){
          setvalidname('Invalid City Name!.........Try again!')
        }
        else{
          setvalidname('')
        }
        console.log(err)
      })
    }
  }

  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter City Name' onChange={e=>setname(e.target.value)}/>
                <button onClick={clickHandler}><BsSearch /></button>
            </div>
                <div className='error'>{validname}</div>
            <div className='winfo'>
              <img src={data.image} alt=''/>
              <h1>{data.celcuis}°</h1>
              <h2>{data.name}</h2>
              <div className="details">
                <div className="col">
                  <WiHumidity size={45} color='rgb(137, 170, 237)'/>
                  <div className='dectext'>
                  <p>Humidity :</p>
                  <p>{data.humidity}%</p>
                  </div>
                </div>
                <div className="col">
                  <FiWind size={45} color='rgb(137, 170, 237)'/>
                  <div className='dectext'>
                  <p>Wind : </p>
                  <p>{data.speed} km/h</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Home