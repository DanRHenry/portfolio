import './App.css';
import Navigation from './components/navbar/Navigation';
import Projects from './components/navbar/Projects';
import AboutMe from './components/navbar/AboutMe';
import CodingBackground from './components/CodingBackground';

function App() {
  return (
    <div className="App">
      <Projects />
      <AboutMe />
      <Navigation />
      <CodingBackground />
    </div>
  );
}

export default App;
