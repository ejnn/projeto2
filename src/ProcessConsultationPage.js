import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";
import SearchBar from "./SearchBar.js";
import ProcessCard from "./ProcessCard.js";
import ProcessDetailsCard from "./ProcessDetailsCard.js";
    

const ProcessConsultationPage = ({}) => {
    const [process, setProcess] = useState({
	numero: "",
	entrada: "",
	descricao: "",
	assunto: "",
	interessados: [],
    });

    const [processes, setProcesses] = useState([]);
    
    useEffect(() => {
	fetch('http://localhost:3000/processo/?q=')
	    .then(res => res.json())
	    .then(json => {
		console.log(json);
		setProcess(json.processos[0]);
		setProcesses(json.processos);
	    });
    }, []);

    return (
	<Grid container
	      spacing={2}>
	    <Grid item
		  xs={12}>
		<SearchBar/>
	    </Grid>

	    <Grid item
		  xs={2}>
	    </Grid>

	    <Grid item
		  xs={5}>
		<List>
		    {
			processes.map(process =>
			    <ListItem disableGutters>
				<ProcessCard shortened process={process}/>
			    </ListItem>
			)
		    }
		</List>
	    </Grid>

	    <Grid item
		  xs={5}>
		<ProcessDetailsCard process={process}/>
	    </Grid>
	</Grid>
    );
};

export default ProcessConsultationPage;
