import React from "react";
import "./App.css";
import LiquidEther from './LiquidEther';
import DecryptedText from './DecryptedText'; // Import DecryptedText

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#060010", height: "100vh", width: "100vw" }}>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />

        <div className="content">
          <h1>
            <DecryptedText text="Shiesty RP 2.0" />
          </h1>
          <p>
            <DecryptedText text="Something amazing is on the way!" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
