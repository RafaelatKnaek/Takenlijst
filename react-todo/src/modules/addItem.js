


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

        //refresh the table and clear the inputs
        setInputs({});
        setRefreshData(true);
      }
    } catch (error) {
        console.error(error);
    }
  };