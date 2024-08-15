import { useState } from 'react';
import { useCookies } from 'react-cookie';

function Modal({ mode, setShowModal, getData, task }) {
  const [cookies] = useCookies(null);
  const editMode = mode === 'edit';

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date().toISOString().slice(0, 10)
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        console.log('WORKED');
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      } else {
        console.error('Failed to update the task. Status:', response.status);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>

          <input
            required
            type="range"
            min="0"
            id="range"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />

          <input
            className="mode"
            type="submit"
            onClick={editMode ? editData : postData} // Correctly call the appropriate function
          />
        </form>
      </div>
    </div>
  );
}

export default Modal;
