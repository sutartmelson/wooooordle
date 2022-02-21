import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title">Wooooordle</div>
      </header>
      <div className="game">
        <Game></Game>
      </div>
    </div>
  );
}

export default App;
