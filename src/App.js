import Gallery from './components/Gallery';
import Header from './components/Header';
import Search from './components/Search';
import { useState } from 'react';


function App() {
  const[tag, setTag] = useState('fish');

  return (
    <div className="App">
      <Header />
      <Search setTag={ setTag }/>
      <Gallery tag={tag}/>
    </div>
  );
}

export default App;

