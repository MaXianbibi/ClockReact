import "./styles.css";
import { LightModeProvider, useLightMode } from "./LightMode";
import { ClockGui } from "./ClockGui";

function App() {
    return (
        <LightModeProvider>
			<div>
            	<ButtonLightMode />
			</div>
            {<ClockGui />}
        </LightModeProvider>
    );
}

function ButtonLightMode() {
    const { lightMode, toggleLightMode } = useLightMode();

    const buttonStyle = {
        backgroundColor: lightMode ? '#000' : '#fff',
        color: lightMode ? '#fff' : '#000',
    };

    const label = lightMode ? "Dark" : "Light";

    return <button onClick={toggleLightMode} style={buttonStyle}>{label}</button>;
}

export default App;