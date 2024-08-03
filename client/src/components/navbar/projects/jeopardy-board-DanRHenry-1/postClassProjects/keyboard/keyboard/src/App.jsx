import "./App.css";
import keyboardImage from "./media/KeyboardImage.png";
function App() {
  return (
    <div id="keyboardContainer">
      <img className="keyboardImage" src={keyboardImage} />
      <div id="chromaticKeyContainer">
        <div id="chromaticKeyLetters">
          <div className="chromaticLetter chromaticPosition">C#</div>
          <div className="chromaticLetter chromaticPosition">D#</div>
          <div className="chromaticPosition"></div>
          <div className="chromaticLetter chromaticPosition">F#</div>
          <div className="chromaticLetter chromaticPosition">G#</div>
          <div className="chromaticLetter chromaticPosition">A#</div>
        </div>
      </div>
      <div id="naturalKeyContainer">
        <div id="naturalKeyLetters">
          <div className="naturalLetter">C</div>
          <div className="naturalLetter">D</div>
          <div className="naturalLetter">E</div>
          <div className="naturalLetter">F</div>
          <div className="naturalLetter">G</div>
          <div className="naturalLetter">A</div>
          <div className="naturalLetter">B</div>
        </div>
      </div>
    </div>
  );
}

export default App;
