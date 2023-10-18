import React, { createContext, useContext, useState } from 'react';
import "./styles.css";


const LightModeContext = createContext();

function setDocumentBackgroundColor(lightMode) {
    const color = lightMode ? '#fff' : '#000';
    document.documentElement.style.setProperty('--main-bg-color', color);
}

export function LightModeProvider({ children }) {
    const [lightMode, setLightMode] = useState(true);

    const toggleLightMode = () => {
        setLightMode(prevLightMode => {
            setDocumentBackgroundColor(!prevLightMode);
            return !prevLightMode;
        });
    };

    const style = {
        display: "flex",
        flexDirection: "column",
        height: "100vh"
    }

    return (
        <LightModeContext.Provider  value={{ lightMode, toggleLightMode }}>
            <div style={style}>
                {children}
            </div>
        </LightModeContext.Provider>
    );
}

export function useLightMode() {
    return useContext(LightModeContext);
}