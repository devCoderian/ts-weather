import './App.css';
import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { Weather } from './weather';
import WeatherInfo from './WeatherInfo';
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
const suffix = "&units=imperial&appid=18772104044136dc0312c0322ec18328";


const App:React.FC = () => {

  //타입 가드 has 추가
  const has = (value: any): value is boolean => !!value;

  //자식 컴포넌트의 메시지를 저장할 msgFromChild 상태 변수 선언
  const [msgFromChild, setMsgFromChild] = useState('');
  const getMsgFromChild = (msg: string) => setMsgFromChild(msg)

  const [city, setCity] = useState('London');
  
  const [weather, setWeather] = useState<Weather | null>(null);

  const getWeather = async(loaction: string) => {
    const response = await fetch(baseUrl+loaction+suffix);
    if(response.status === 200){
      const jsonWeather = await response.json();
      console.log(jsonWeather);
      const cityTemp:Weather = jsonWeather.main;
      cityTemp.city =jsonWeather.name;
      setWeather(cityTemp);
    }else{
      setWeather(null);
    }
  }

 //DOM에 추가되거나 재렌더링 된 이후에 코드를 실행하고 싶다면 useEffect() 사용/컴포넌트가 외부 데이터를 이용할 때
 //첫 렌더링 이후 useEffect() 가 단 한번만 실행되길 원한다면 두번째 인자 빈배열
useEffect(()=> {
  getWeather(city)
},[])

//이벤트 핸들러 함수에 event:any를 이자로 사용하지 않기 위해
//node_modules/@types/react/index.d.ts -> Event Handler Types 검색 -> 제네릭 타입 ChangeEvent<T>
const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
  setCity(event.target.value); // setState를 호출해 리액트에 업데이트 UI가 필요함을 알림
}

const handleSubmit = (event:FormEvent) =>{ //submit 버튼을 누르면 FormEvent가 호출됨
  event.preventDefault();
  getWeather(city);
}
  return (
    <>
      <form onSubmit ={handleSubmit}>
        <input type = "text" placeholder = "Enter city" 
        onChange = {handleChange}/>
        <button type="submit">Get Weather</button>
      </form>
      {msgFromChild}
      {has(weather) ? (
        // weather를 WeatherInfo로 보내기
        <WeatherInfo weather = {weather} parentChannel={getMsgFromChild} > 
          <strong>children jsx코드도 전달 가능-부모쪽에서 왔음</strong>
        </WeatherInfo>
      ):(
        <h2>NoWeather available</h2>
      )}
      {/* <h2>City: {city}</h2>
        {weather && <h2>Temperature: {weather.temp}F</h2>} */}
    </>
  );
}

export default App;

//리액트 앱은 컴포넌트로 이루어진 트리라고 할 수 있다. 우리가 할 일은 컴포넌트가 각자 컨테이너가 될지 프레젠테이션이 될지 결정하는 것이다.