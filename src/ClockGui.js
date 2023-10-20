import { useLightMode } from "./LightMode";
import { useEffect, useState } from 'react';

const SECONDS_IN_A_MINUTE = 60;
const secondsArray = Array.from({ length: SECONDS_IN_A_MINUTE }, (_, index) => index);

function GuiInterface({ label, value, onChange }) {
    const handleSelectionChange = (event) => {
        const selectedValue = event.target.value;
        onChange(selectedValue);
    };

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", width: "100%" }}>
                <label htmlFor="second">{label}</label>
                <select value={value} onChange={handleSelectionChange}>
                    {secondsArray.map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}


function Clock({ seconds, minutes, hours, lightMode }) {
    const clockStyle = {
        backgroundColor: lightMode ? '#000' : '#fff',
        color: lightMode ? '#fff' : '#000',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '100px',
        height: "auto",
        width: "auto",
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={clockStyle}>
            <p style={{ margin: "0" }}>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
        </div>
    );
}

export function ClockGui() {
    const { lightMode } = useLightMode();
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);


    const [isRunning, setIsRunning] = useState(false);


    const clockStyle = {
        backgroundColor: lightMode ? '#000' : '#fff',
        color: lightMode ? '#fff' : '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        width: '50%',
    };

    const bodyStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const guiStyle = {
        backgroundColor: lightMode ? "#A9A9A9" : '#A9A9A9',
        color: lightMode ? '#000' : '#000',
        display: 'flex',
        flexDirection: "column",
        gap: "30px",
        alignItems: 'center',
        justifyContent: 'center',
        width: "15%",
        height: "50%"
    }

    const handleSecondChange = (value) => {
        setSeconds(prev => value);
        console.log("Selected second:", value);
    };

    const handleMinuteChange = (value) => {
        setMinutes(prev => value);
        console.log("Selected minute:", value);
    };

    const handleHourChange = (value) => {
        setHours(prev => value);
        console.log("Selected hour:", value);
    };

    useEffect(() => {
        let intervalId;
    
        if (isRunning) {
            intervalId = setInterval(() => {
                
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else if (hours > 0) {
                    setSeconds(59);
                    setMinutes(59);
                    setHours(hours - 1);
                } else {
                    setIsRunning(false);
                }
    
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, seconds, minutes, hours]);
    
    
    


    return (
        <div style={bodyStyle}>
            <div style={guiStyle}>
                <GuiInterface
                    label="Seconds :"
                    onChange={handleSecondChange}
                />
                <GuiInterface
                    label="Minutes :"
                    onChange={handleMinuteChange}
                />
                <GuiInterface
                    label="Hours :"
                    onChange={handleHourChange}
                />
            </div>
            <div style={clockStyle}>
                <Clock
                    seconds={seconds}
                    minutes={minutes}
                    hours={hours}
                    lightMode={lightMode}
                />
                <button onClick={() => { setIsRunning(prev => !prev) }}>{isRunning ? "Stop" : "Start"}</button>
            </div>
        </div>
    );
}
