import { useLightMode } from "./LightMode";
import { useState } from 'react';

function GuiInterface({children}) {
    // 1. Initialisez un state pour la valeur choisie
    const [selectedSecond, setselectedSecond] = useState('');

    // 2. Gestionnaire d'événement pour écouter les modifications de la sélection
    const handleSelectionChange = (event) => {
        setselectedSecond(event.target.value);
    };

    return (
        <div style={{width: "100%"}}>
            <div style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap", width: "100%"}}>
                <label htmlFor="second">{children}</label>
                <select value={selectedSecond} onChange={handleSelectionChange}>
                    {[...Array(60).keys()].map((_, index) => (
                        <option key={index} value={index}>
                            {index}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export function ClockGui() {
    const { lightMode } = useLightMode();

    const clockStyle = {
        backgroundColor: lightMode ? '#000' : '#fff',
        color: lightMode ? '#fff' : '#000',
        display: 'flex',
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

    return (
        <div style={bodyStyle}>

            <div style={guiStyle}>
                <GuiInterface>
                    Seconds :
                </GuiInterface>
                <GuiInterface>
                    Minutes :
                </GuiInterface>
                <GuiInterface>
                    Hours :
                </GuiInterface>
            </div>

            <div style={clockStyle}></div>

        </div>
    );
}