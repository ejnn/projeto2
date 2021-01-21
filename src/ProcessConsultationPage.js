import { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";

import SearchBar from "./SearchBar.js";
import ProcessCard from "./ProcessCard.js";
import ProcessDetailsCard from "./ProcessDetailsCard.js";
import ProcessFormCard from "./ProcessFormCard.js";

const useStyles = makeStyles({
    flex: {
	display: "flex",
    }
});

const ProcessConsultationPage = ({}) => {
    const classes = useStyles();

    const [selectedProcess, setSelectedProcess] = useState(null);

    const handleSelectedProcess = (event, selected) => {
	setSelectedProcess(selected);
    };

    const deselectProcess = () => {
	setSelectedProcess(null);
    };

    const deleteSelectedProcess = () => {
	fetch("http://localhost:3000/processo/" + selectedProcess.id,
	      {
		  method: "DELETE"
	      }
	     )
	    .then(updateProcesses)
	    .then(deselectProcess);
    };

    const updateProcesses = () => {
	fetch("http://localhost:3000/processo/?q=" + query)
	    .then(res => res.json())
	    .then(json => {
		setProcesses(json.processos);
	    });
    }

    const [query, setQuery] = useState("");

    const handleNewQuery = () => {
	deselectProcess();
	setQuery("");
    };

    const handleQueryChange = (event) => {
	setQuery(event.target.value);
    };

    useEffect(() => {
	updateProcesses();
    }, [query]);

    const [processes, setProcesses] = useState([]);
    
    useEffect(() => {
	updateProcesses();
    }, []);

    const [modal, setModal] = useState(false);

    const handleModalOpen = () => {
	setModal(true);
    };

    const handleModalClose = () => {
	setModal(false);
	updateProcesses();
	deselectProcess();
    };


    return (
	<Grid container
	      spacing={2}>
	    <Grid item
		  xs={2}>
		<Typography variant="h2"
			    align="center">
		    Busca de processos
		</Typography>
	    </Grid>

	    <Grid item
		  xs={5}>
		<SearchBar query={query}
			   onNewQuery={handleNewQuery}
			   onChange={handleQueryChange}/>
	    </Grid>

	    <Grid item
		  xs={2}>
		<Button onClick={handleModalOpen}
			fullWidth
			variant="outlined">
		    Novo
		</Button>
		<Modal open={modal}
		       onClose={handleModalClose}>
		    <ProcessFormCard onClose={handleModalClose}/>
		</Modal>
	    </Grid>

	    <Grid item
		  xs={3}>
	    </Grid>

	    <Grid item
		  xs={2}>
	    </Grid>

	    <Grid item
		  xs={selectedProcess ? 5 : 8}>
		<List>
		    <ToggleButtonGroup className={classes.flex}
				       value={selectedProcess}
				       onChange={handleSelectedProcess}
				       exclusive
				       orientation="vertical">
		    {
			processes.map(process =>
			    <ToggleButton value={process}>
				<ListItem disableGutters>
			    	    <ProcessCard shortened={selectedProcess ? true : false}
			    			 process={process}/>
				</ListItem>
			    </ToggleButton>
			)
		    }
		    </ToggleButtonGroup>
		</List>
	    </Grid>

	    { selectedProcess ?
	    <Grid item
		  xs={5}>
		<ProcessDetailsCard process={selectedProcess}
				    onClose={deselectProcess}
				    onDelete={deleteSelectedProcess}
				    onEdit={handleModalOpen}/>
		<Modal open={modal}
		       onClose={handleModalClose}>
		    <ProcessFormCard process={selectedProcess}
				     onClose={handleModalClose} />
		</Modal>
	    </Grid>
	      : null
	    }
	</Grid>
    );
};

export default ProcessConsultationPage;
