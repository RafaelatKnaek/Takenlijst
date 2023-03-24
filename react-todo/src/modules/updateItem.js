function UpdateStatusButton({ id, title, status, refreshDataCallback, setMessage, setShowPopup }) {

    const handleClick = async () => {

        try {
            const response = await fetch(`http://localhost:3001/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "id": Number(id), "title": title})
            });
            refreshDataCallback();

            const data = await response.json();
            if (data.success) {
                console.log(data.message);
                setMessage(data.message);
                setShowPopup(true);
        
                setTimeout(() => {
                  setShowPopup(false);
                }, 10000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button className="todoBtn" onClick={handleClick}>
            {status === 0 ? ' ' : '✓'}
        </button>
    );
}

export default UpdateStatusButton;
