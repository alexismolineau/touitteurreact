import logo from './logo.svg';
import './App.css';
import NewTouitForm from './NewTouitForm/NewTouitForm';
import LeftColumn from './LeftColumn/LeftColum';
import RightColum from './RightColumn/RightColum';

function App() {
  return (
    <div className="App">
      <header className="container bg-light">
        <h1>Touitteur</h1>
        <NewTouitForm />
      </header>
      <main className="container mt-3">
        <div className="row">
          <LeftColumn />
          <RightColum />
        </div>
      </main>
    </div>
  );
}

export default App;
