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
            <table>
                <tr>
                    <th>Item ID</th>
                    <th>Item Name</th>
                </tr>
                {items.map(item => (
                    <tr key={item.ID} className={"item"}>
                        <td className={"item_id"}>{item.ID}</td>
                        <td className={"item_name"}>{item.Name}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default App;