import Gallery from './components/Gallery';
import Header from './components/Header';
import Search from './components/Search';
// import Test from './components/Test';
import { useState } from 'react';


function App() {
  const[tag, setTag] = useState('fish');

  return (
    <div className="App">
      {/* <Test /> */}
      <Header />
      <Search setTag={ setTag }/>
      <Gallery tag={tag}/>
    </div>
  );
}

export default App;

