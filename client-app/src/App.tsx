import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { Header, List } from 'semantic-ui-react';

function App() {
const [postimet, setPostimet] = useState([]);


useEffect(()=>{
  axios.get("http://localhost:5000/api/Postimet").then(response =>{
    setPostimet(response.data);
    console.log(response);
  })
},[])

  return (
    <div>
      <Header as="h2" icon="users" content="Postimet"/>
        <List>
        {postimet.map((postimi:any) =>(
           <li key={postimi.id}> 
           {postimi.titulli}
           </li>
           
         ))}
        </List>
    </div>
  );
}

export default App;
