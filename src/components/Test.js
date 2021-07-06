import { useState, useEffect } from 'react';
 
const Test = () => {
    const [resourceType, setResourceType] = useState('posts');
    const [items, setItems] = useState([]);

    
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then(response => response.json())
        .then(json => setItems(json))
    }, [resourceType])

    return ( 
        <div >
            <button onClick={() => setResourceType('comments')}>Comments</button>
            <button onClick={() => setResourceType('posts')}>Posts</button>
            <button onClick={() => setResourceType('users')}>Users</button>
            {items.map(item => (<pre>{JSON.stringify(item)}</pre>))}
        </div>
     );
}
 
export default Test;