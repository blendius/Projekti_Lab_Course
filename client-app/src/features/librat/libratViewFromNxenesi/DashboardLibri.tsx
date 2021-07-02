import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ListLibri from './ListLibri';


export default observer(function DashboardLibri() {
    const { libriStore, nxenesiStore } = useStore();

    const { libriByDate} = libriStore;
    const {nxenesiSelected} = nxenesiStore

    useEffect(() => {
        libriStore.loadLibrat();
      }, [libriStore]);

   // console.log("Klasa:", nxenesiSelected?.class);
    return (
        <>
            <h2 className="ui center aligned icon header">
                <i className="circular book icon"></i>
                Librat
            </h2>
          {/* <h1 style={{textAlign: "center", color: "#2B547E"}}> Librat </h1> */}
          {libriByDate.filter(item => item.klasa === nxenesiSelected?.class).map(libri => (
              
              <div className="ui piled segment">
            {/* <Segment key={libri.id}> */}
                <Grid> 
                    <ListLibri libri={libri}/>
                </Grid>
            {/* </Segment> )) */}
            </div>))}
            
        </>
        
    )
})