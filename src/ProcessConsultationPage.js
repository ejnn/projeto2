import { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { Modal } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import theme from "./theme.js";

import SearchBar from "./SearchBar.js";
import ProcessCard from "./ProcessCard.js";
import ProcessDetailsCard from "./ProcessDetailsCard.js";
import ProcessFormCard from "./ProcessFormCard.js";

const useStyles = makeStyles({
    ...theme,
    
    toggleButton: {
	padding: "0",
	margin: "8px 0",
	border: "none",
	
	"&.MuiToggleButton-root": {
	    "&.Mui-selected": {
		color: "rgba(0,0,0,0)",
		backgroundColor: "rgba(0,0,0,0)",
	    },
	    
	    "&:hover": {
		color: "rgba(0,0,0,0)",
		backgroundColor: "rgba(0,0,0,0)",
		outline: "1px solid " + theme.colors.primary,
	    },
	},
    },
    
    listItem: {
	padding: "0",
	margin: "0",
    },
    
    buttonLabel: {
	...theme.buttonLabel,
	color: theme.colors.black54,
    },
    
    flex: {
	display: "flex",
    },
    
    pageContent: {
	margin: "8px",
	maxHeight: "100vh",
    },
    
    list: {
	maxHeight: "80vh",
	overflow: "auto",
	padding: "0 8px",
    },
    
    grid: {
	padding: "0",
    },
    
    modalBox: {
	margin: "auto",
	height: "auto",
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
	<Box className={classes.pageContent}>
	    <Grid className={classes.grid}
		  container
		  spacing={2}>
		<Grid item
		      container
		      alignItems="center"
		      spacing={2}>
		    <Grid item
			  xs={2}>
			<Typography className={classes.title}
				    align="center">
			    Busca de processos
			</Typography>
		    </Grid>
		    
		    <Grid item
			  xs={4}>
			<SearchBar query={query}
				   onNewQuery={handleNewQuery}
				   onChange={handleQueryChange}/>
		    </Grid>
		    
		    <Grid item
			  xs={2}>
			<Button onClick={handleModalOpen}
				fullWidth
				variant="outlined">
			    <Typography className={classes.buttonLabel}
					align="center">
				Novo
			    </Typography>
			</Button>
			<Modal open={modal}
			       onClose={handleModalClose}>
			    <Box display="flex"
				 flexDirection="column"
				 justifyContent="flex-start"
				 alignItems="center"
				 alignContent="center"
				 m={8}>
				<ProcessFormCard onClose={handleModalClose}/>
			    </Box>
			</Modal>
		    </Grid>
		</Grid>
		
		<Grid item
		      xs={2}>
		</Grid>
		
		<Grid item
		      xs={selectedProcess ? 4 : 8}>
		    <List className={classes.list}>
			<ToggleButtonGroup className={classes.flex}
					   value={selectedProcess}
					   onChange={handleSelectedProcess}
					   exclusive
					   orientation="vertical">
			    {
				processes.map(process =>
				    <ToggleButton className={classes.toggleButton}
						  value={process}>
					<ListItem className={classes.listItem}
						  disableGutters>
			    		    <ProcessCard shortened={selectedProcess ? true : false}
							 highlighted={selectedProcess
								      ? selectedProcess.id == process.id
								      : false }
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
			  <Box display="flex"
			       flexDirection="column"
			       justifyContent="flex-start"
			       alignItems="center"
			       alignContent="center"
			       m={8}>
			      <ProcessFormCard process={selectedProcess}
					       onClose={handleModalClose} />
			  </Box>
		      </Modal>
		  </Grid>
		  : null
		}
	    </Grid>
	</Box>
    );
};

export default ProcessConsultationPage;
