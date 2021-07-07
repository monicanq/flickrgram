import { useState } from 'react';


const Search = ({ setTag }) => {
    const[search, setSearch] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        setTag(search);
        setSearch('');
    }
  
    return (
        <div className="search">
            <form onSubmit={ handleSubmit }>
                <input 
                    type="text"
                    required
                    value={ search }
                    onChange={e => setSearch(e.target.value)}
                />
                <button>Search</button>           
            </form>
        </div>
    )
  }
  
  export default Search;