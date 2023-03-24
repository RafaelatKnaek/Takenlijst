import React, { useState, useEffect } from 'react';
import UpdateStatusButton from './updateItem';
import DeleteButton from './deleteItem';

function Table({ refreshDataCallback, setMessage, setShowPopup}) {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const response = await fetch('http://localhost:3001/');
        const data = await response.json();
        console.log(data)
        setItems(data);
    };

    useEffect(() => {
        fetchItems()
    }, [refreshDataCallback]);

    return (
        <table>
            <thead>
                <tr>
                <th></th>
                <th>Title</th>
                <th>Description</th>
                <th>Van </th>
                <th></th>
                </tr>
            </thead>
            <tbody>

            {items.map(item => (
            <tr key={item.id}>
                <td>
                    <UpdateStatusButton id={item.id} title={item.title} status={item.status} refreshDataCallback={refreshDataCallback} setMessage={setMessage} setShowPopup={setShowPopup} />
                </td>
                <td>
                    {item.title}
                </td>
                <td>
                    {item.description}
                </td>
                <td>
                    {item.name}
                </td>
                <td>
                    <DeleteButton id={item.id} title={item.title} refreshDataCallback={refreshDataCallback} setMessage={setMessage} setShowPopup={setShowPopup} />
                </td>
                </tr>
            ))}

            </tbody>
        </table>
    );
}

export default Table;
