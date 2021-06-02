import logo from './logo.svg';
import './App.css';
import NewTouitForm from './NewTouitForm/NewTouitForm';
import LeftColumn from './LeftColumn/LeftColum';
import RightColum from './RightColumn/RightColum';
import { useState } from 'react';

const App = () => {

  const [filter, setFilter] = useState('');
  const filterTouits = filterTerm => {
    filter === filterTerm ? setFilter('') : setFilter(filterTerm);
  }

  return (
        <div className="App">
          <header className="container bg-light">
            <h1>Touitteur</h1>
            <NewTouitForm />
          </header>
          <main className="container mt-3">
            <div className="row">
              <LeftColumn filter={filter}/>
              <RightColum filterTouits={filterTouits} filter={filter}/>
            </div>
          </main>
        </div>
  );
}

export default App;
