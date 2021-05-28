import React, { Fragment, useEffect, useState } from 'react';

import axios from "axios";
import { Container, List } from 'semantic-ui-react';
import ShowProfessors from '../../features/profesoret/profesoret';

function App() {
  const [postimet, setPostimet] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/Postimet").then(response => {
      setPostimet(response.data);
      console.log(response);
    })
  }, [])

 

  return (
    <Fragment>

      <Container style={{ marginTop: '7em' }}>
        <List>
          {postimet.map((postimi: any) => (
            <li key={postimi.id}>
              {postimi.titulli}
            </li>

          ))}
        </List>
        <ShowProfessors />

      </Container>
    </Fragment>
  );
}

export default App;
