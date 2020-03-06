import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const [items, setItems] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await window.fetch('http://avengers1.web.illinois.edu/cpi_api/items');
            const json = await response.json();
            console.log("json response", json);

            if (Array.isArray(json)) {
                setItems(json);
            }
        };

        getData().then();
    }, []);

    return (
        <div className="App">
            <div>Database Items: </div>
            <div>
                {items.map(item => (
                    <div key={item.ID}>{item.Name}</div>
                ))}
            </div>
        </div>
    );
}

export default App;