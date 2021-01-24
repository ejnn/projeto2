import { useState, useEffect, useRef } from "react";

import { Grid } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { Modal } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
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
	margin: "16px 8px",
	maxHeight: "100vh",
    },
    
    list: {
	maxHeight: "80vh",
	overflow: "auto",
	padding: "0 8px",
    },
    
    details: {
	height: "100%",
	maxHeight: "80vh",
	padding: "0 8px",
	overflow: "auto",
    },
    
    grid: {
	padding: "0",
    },
    
    deletionSnackbar: {
	backgroundColor: theme.colors.black54,
	color: "white",
	padding: "0 4px",
	maxWidth: "12vw",
	borderRadius: "4px",
    },

    heightBox: {
	maxHeight: "80vh",
	overflow: "auto",
    }
});

const ProcessConsultationPage = ({...props}) => {
    const classes = useStyles();
    
    const searchBarRef = useRef(null);
    
    useEffect(() => {
	searchBarRef.current.focus();
    }, []);
    
    const [query, setQuery] = useState("");
    
    const handleQueryChange = (event) => {
	setQuery(event.target.value);
    };
    
    
    const [processes, setProcesses] = useState([]);
    
    useEffect(() => {
	// reselecting the process so the user
	// has a consistent experience
	if (selectedProcess) {
	    const id = selectedProcess.id;
	    const found = processes.find(process => process.id == id);
	    if (found) {
		setSelectedProcess(found);
	    }
	}
    }, [processes]);
    
    useEffect(() => {
	updateProcesses();
    }, [query]);
    
    const updateProcesses = () => {
	fetch("http://localhost:3000/processo/?q=" + query)
	    .then(res => res.json())
	    .then(json => setProcesses(json.processos));
    }
    
    
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
	    .then(deselectProcess)
	    .then(() => openModal("deletionSnackbar"))
	    .then(updateProcesses);
    };
    
    
    
    const [modals, setModals] = useState({
	newProcess: false,
	editProcess: false,
	deletionSnackbar: false,
    });
    
    const openModal = (name) => {
	setModals(modals => ({...modals, [name]: true}));
    };
    
    const closeModal = (name) => {
	setModals(modals => ({...modals, [name]: false}));
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
			<SearchBar inputRef={searchBarRef}
				   query={query}
				   onChange={handleQueryChange}/>
		    </Grid>
		    
		    <Grid item
			  xs={2}>
			<Button onClick={() => openModal("newProcess")}
				fullWidth
				variant="outlined">
			    <Typography className={classes.buttonLabel}
					align="center">
				Novo
			    </Typography>
			</Button>
			<Modal open={modals.newProcess}
			       onClose={() => closeModal("newProcess")}>
			    <Box className={classes.heightBox}
				 display="flex"
				 flexDirection="column"
				 justifyContent="flex-start"
				 alignItems="center"
				 alignContent="center"
				 m={8}>
				<ProcessFormCard onClose={() => {
						     closeModal("newProcess");
						     updateProcesses();
						 }}/>
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
		  <>
		      <Grid item
		 	    xs={5}>
			  <Box className={classes.details}>
			      <ProcessDetailsCard process={selectedProcess}
		 				  onClose={deselectProcess}
		 				  onDelete={deleteSelectedProcess}
		 				  onEdit={() => openModal("editProcess")}/>
			  </Box>
		      </Grid>
		      <Modal open={modals.editProcess}
		 	     onClose={() => closeModal("editProcess")}>
		 	  <Box className={classes.heightBox}
			       display="flex"
		 	       flexDirection="column"
		 	       justifyContent="flex-start"
		 	       alignItems="center"
		 	       alignContent="center"
		 	       m={8}>
		 	      <ProcessFormCard process={selectedProcess}
		 			       onClose={() => {
		 				   closeModal("editProcess");
		 				   updateProcesses();
		 			       }} />
		 	  </Box>
		      </Modal>
		  </>
		  : null
		}

		<Snackbar className={classes.deletionSnackbar}
			  autoHideDuration={3000}
			  anchorOrigin={{
		 	      vertical: "bottom",
		 	      horizontal: "left",
		      	  }}
		      	  open={modals.deletionSnackbar}
		      	  onClose={() => closeModal("deletionSnackbar")}>
		    <Box className={classes.deletionSnackbar}>
			<Typography className={classes.subtitle}
				    align="center">
			    Processo removido
			</Typography>
		    </Box>
		</Snackbar>
	    </Grid>
	</Box>
    );
};

export default ProcessConsultationPage;
