import Ticklcon from './Ticklcon';
import ProgressBar from './ProgressBar';
import { useState } from 'react';
import Modal  from './Modal';

function ListItem ({task, getData}) {
    const [showModal, setshowModal] = useState(false);

    const deleteItem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
          method: "DELETE",
        });
        if (response.status === 200) {
          getData();
        }
      } catch(err) {
        console.error(err);
      }
    }

    return (
      <li className="list-item">
        <div className="info-container">
          <Ticklcon />
          <p className="task-title">{task.title}</p>
          <ProgressBar progress= {task.progress} />
        </div>

        <div className='button-container'>
          <button className="edit" onClick={() => setshowModal(true)}>EDIT</button>
          <button className="delete" onClick={deleteItem}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setshowModal} task={task} getData={getData}/>}
      </li>
    );
  }
  
  export default ListItem;