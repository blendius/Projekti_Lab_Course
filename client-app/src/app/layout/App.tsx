import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
import axios from "axios";
import { Prindi } from '../../app/models/prindi';
import { v4 as uuid } from 'uuid';
import { Container, List } from 'semantic-ui-react';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import PrindiDashboard from '../../features/prinderit/dashboard/PrindiDashboard';

function App() {
  const [postimet, setPostimet] = useState([]);

  const [prinderit, setPrinderit] = useState<Prindi[]>([]);
  const [selectedPrindi, setSelectedPindi] = useState<Prindi | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sumbitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/Postimet").then(response => {
      setPostimet(response.data);
      console.log(response);
    })
  }, [])


  useEffect(() => {
    // const [prinderit, setPrinderit] = useState<Prindi[]>([]);
    // const [selectedPrindi, setSelectedPindi] = useState<Prindi | undefined>(undefined);
    // const [editMode, setEditMode] = useState(false);
    // const [loading, setLoading] = useState(true);
    // const [sumbitting, setSubmitting] = useState(false);
    agent.Prinderit.list().then(response => {
      let prinderit: Prindi[] = [];
      response.forEach(prindi => {
        ;
        prinderit.push(prindi);
      })
      setPrinderit(prinderit);
      setLoading(false);
    })
  }, [])


  function handleSelectPrindi(id: string) {
    setSelectedPindi(prinderit.find(x => x.id === id));
  }
  function handleCancelSelectedPrindi() {
    setSelectedPindi(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectPrindi(id) : handleCancelSelectedPrindi();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditPrindi(prindi: Prindi) {
    setSubmitting(true);
    if (prindi.id) {
      agent.Prinderit.update(prindi).then(() => {
        setPrinderit([...prinderit.filter(x => x.id !== prindi.id), prindi])
        setSelectedPindi(prindi);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      prindi.id = uuid();
      agent.Prinderit.create(prindi).then(() => {
        setPrinderit([...prinderit, prindi]);
        setSelectedPindi(prindi);
        setEditMode(false);
        setSubmitting(false);
      }
      )
    }

  }

  function handleDeletePrindi(id: string) {
    setSubmitting(true);
    agent.Prinderit.delete(id).then(() => {
      setPrinderit([...prinderit.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }
  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>

      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
      <PrindiDashboard 
      prinderit={prinderit}
            selectedPrindi={selectedPrindi}
            selectPrindi={handleSelectPrindi}
            cancelSelectPrindi={handleCancelSelectedPrindi}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditPrindi}
            deletePrindi={handleDeletePrindi}
            submitting={sumbitting}
          />

      </Container>
    </Fragment>
  );
}

export default App;
