import * as React from "react";
import { Weather } from "./weather";
const WeatherInfo:React.FC<{weather: Weather, parentChannel:(msg:string) => void}> = ({weather, children, parentChannel}) => {
    const { city, humidity, pressure,temp, temp_max, temp_min} = weather;
    //자식 컴포넌트에서 부모컴포넌트로 보내기
    
    return (
        <div>
            children:{children}
            <h2>city: {city}</h2>
            <h2>humidity:{humidity}</h2>
            <h2>pressure:{pressure}</h2>
            <h2>temp:{temp}</h2>
            <h2>temp_max:{temp_max}</h2>
            <h2>temp_min:{temp_min}</h2>
            <div>
                <button onClick = {() => parentChannel("Hello from Child")}>
                    say hello to parent
                </button>
            </div>
        </div>
    )
}

export default WeatherInfo;