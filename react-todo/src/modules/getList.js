// not used

import React, { useState, useEffect } from 'react';
import '../App.css';


function List() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const response = await fetch('http://localhost:3001/');
            const data = await response.json();
            setItems(data);
        }
        fetchItems();
    }, [refreshData]);

    return (
        <div>
        {items.map(item => (
            <tr key={item.id}>
                <td>
                    <form action='/' method='post'>
                        <input type="hidden" name='id' value={item.id} />
                        <input type="hidden" name='title' value={item.title} />
                        <input className="todoBtn" type="submit" value='☐☑︎' />
                    </form>
                </td>
                <td>
                    react leren
                </td>
                <td>
                    react leren
                </td>
                <td>
                    <form action='/' method='post'>
                        <input type="hidden" name='id' value={item.id} />
                        <input type="hidden" name='title' value={item.title} />
                        <input className="deleteBtn" type="submit" value='🗑️' />
                    </form>
                </td>
            </tr>
        ))}
        </div>
    );
}

export default List;