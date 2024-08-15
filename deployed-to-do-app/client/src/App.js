import ListHeader  from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import {useEffect, useState} from'react';
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    
    try {
      const response = await fetch(`https://listing-making-app-backend-gahmeffmcah4fjgc.westeurope-01.azurewebsites.net/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (authToken){
      getData(); // Call the function here
    }}
  , []); // Dependency array should be outside the function call
  
  console.log(tasks);

  //Sort by date 
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken && 
        <>
          <ListHeader listName={'🏝 Holiday Tick List'} getData={getData}/>      
          <p className="user-email">Welome back {userEmail} </p>
          {sortedTasks?.map((task) => <ListItem key={task.id} task ={task} getData={getData}/>)}
        </>
      }
    </div>    
  );
}

export default App;
