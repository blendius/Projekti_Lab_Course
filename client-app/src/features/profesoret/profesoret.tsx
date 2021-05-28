import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
import { Profesori } from '../../app/models/profesori';
import ProfesoriDashboard from './dashboard/ProfesoriDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';


export default function ShowProfessors() {

  const [profesoret, setProfesoret] = useState<Profesori[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<Profesori | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sumbitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Profesoret.list().then(response => {
      let profesoret: Profesori[] = [];
      response.forEach(profesori => {
        profesori.dataRegjistrimit = profesori.dataRegjistrimit.split('T')[0];
        profesoret.push(profesori);
      })
      setProfesoret(profesoret);
      setLoading(false);
    })
  }, [])

  function handleSelectProfessor(id: string) {
    setSelectedProfessor(profesoret.find(x => x.id === id));
  }
  function handleCancelSelectedProfessor() {
    setSelectedProfessor(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectProfessor(id) : handleCancelSelectedProfessor();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }
  const [profMode, setProfMode] = useState(false);
  function handleSetProfMode() {
    setProfMode(true)

  }
  function handleCreateOrEditProfessor(profesori: Profesori) {
    setSubmitting(true);
    if (profesori.id) {
      agent.Profesoret.update(profesori).then(() => {
        setProfesoret([...profesoret.filter(x => x.id !== profesori.id), profesori])
        setSelectedProfessor(profesori);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      profesori.id = uuid();
      agent.Profesoret.create(profesori).then(() => {
        setProfesoret([...profesoret, profesori]);
        setSelectedProfessor(profesori);
        setEditMode(false);
        setSubmitting(false);
      }
      )
    }

  }
  function handleDeleteProfessor(id: string) {
    setSubmitting(true);
    agent.Profesoret.delete(id).then(() => {
      setProfesoret([...profesoret.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }
  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <div>
        {
          profMode &&
          <ProfesoriDashboard profesoret={profesoret}
            selectedProfessor={selectedProfessor}
            selectProfessor={handleSelectProfessor}
            cancelSelectProfessor={handleCancelSelectedProfessor}
            editMode={editMode}
            openForm={handleFormOpen}
            openForm2={handleFormOpen}
            closeForm={handleFormClose}
            profMode={profMode}
            showProfMode={handleSetProfMode}
            createOrEdit={handleCreateOrEditProfessor}
            deleteProfessor={handleDeleteProfessor}
            submitting={sumbitting}
          />}
      </div>

      <NavBar showProf={handleSetProfMode} />
    </Fragment>
  )
}