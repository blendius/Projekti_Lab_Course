import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
import axios from "axios";
import { Prindi } from '../../app/models/prindi';
import { v4 as uuid } from 'uuid';
import { Button, Container, List } from 'semantic-ui-react';

import PrindiDashboard from './dashboard/PrindiDashboard';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';

function ShowPrinderit() {

  const [prinderit, setPrinderit] = useState<Prindi[]>([]);
  const [selectedPrindi, setSelectedPindi] = useState<Prindi | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sumbitting, setSubmitting] = useState(false);

  
  useEffect(() => {
   
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
  if (loading) return <LoadingComponent inverted={false} content='Loading app' />

  return (
    <Fragment>

      <NavBar  />
      <Container style={{ marginTop: '7em' }}>
      <PrindiDashboard 
      prinderit={prinderit}
            selectedPrindi={selectedPrindi}
            selectPrindi={handleSelectPrindi}
            cancelSelectPrindi={handleCancelSelectedPrindi}
            editMode={editMode}
            openForm={handleFormOpen}
            openForm2={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditPrindi}
            deletePrindi={handleDeletePrindi}
            submitting={sumbitting}
          />
      </Container>
    </Fragment>
  );
}

export default ShowPrinderit;
