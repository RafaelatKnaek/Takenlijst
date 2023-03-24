import './App.css';
import { useState, useEffect } from "react";
import Table from './modules/table';

function App() {
  const [inputs, setInputs] = useState({});
  const [refreshData, setRefreshData] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  const handleRefreshData = () => {
    setRefreshData(!refreshData);
  };

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3001/users');
    const data = await response.json();
    console.log(data)
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers()
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    setInputs(values => ({...values, [name]: value}));
  };

  const handleUserChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    setInputs(values => ({...values, [name]: Number(value)}));
  };

  const addItem = async (event) => {
    event.preventDefault();
    console.log(inputs);

    try {
      const response = await fetch(`http://localhost:3001/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "title": inputs.title, "description": inputs.description, "user": inputs.user})
      });

      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        setMessage(data.message);
        setShowPopup(true);

        const name = "user";
        const value = inputs.user;
        //refresh the table and clear the inputs
        setInputs({});
        setRefreshData(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 10000);

        setInputs(values => ({...values, [name]: Number(value)}));
      }
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {showPopup && <div className="popup">{message}</div>}

          <h1>Knaek taken lijst:</h1>

          <Table refreshDataCallback={handleRefreshData} setMessage={setMessage} setShowPopup={setShowPopup} />

          <div className='addmore'>
            <h2>Nieuwe taak toevoegen</h2>
            <form onSubmit={addItem}>
              <div className="fields">
                <div className="fields-group position-relative">
                  <div className="fields-group-prefix position-absolute">TITEL VAN DE TAAK</div>
                  <input type="text" className="fields-group-input w-100" required={true} name='title' placeholder='Vul een titel in' onChange={handleChange} value={inputs.title || ''} />
                </div>
              </div>
              <div className="fields">
                <div className="fields-group position-relative">
                  <div className="fields-group-prefix position-absolute">BESCHRIJVING VAN DE TAAK</div>
                  <input type="text" className="fields-group-input w-100" name='description' placeholder='Vul een beschrijving in' onChange={handleChange} value={inputs.description || ''} />
                </div>
              </div>
              <div className="fields">
                <div className="fields-group position-relative">
                  <div className="fields-group-prefix position-absolute">BEZITER VAN DE TAAK</div>
                  <div className="fields-group-input w-100 custom-select">
                    <select name="user" onChange={handleUserChange}>
                      <option value={null}>Geen</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name} </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <input type="submit" className="addmorebtn" value='Add task' />
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
