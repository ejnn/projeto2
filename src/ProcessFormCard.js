import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { List, ListSubheader, ListItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import theme from "./theme.js";

const useStyles = makeStyles({
    ...theme,

    title: {
	...theme.title,
	color: theme.colors.black87,
	paddingBottom: "0",
    },

    textField: {
	"&.MuiInputLabel-root": {
	    ...theme.subtitle,
	    color: "red",
	}
    },

    closeButton: {
	position: "absolute",
	right: "0",
	top: "0",
	fill: theme.colors.black54,
    },

    addButton: {
	...theme.buttonLabel,
	color: "white",
    },

    saveButton: {
	...theme.buttonLabel,
	backgroundColor: theme.colors.primary,
	color: "white",
    },

    relative: {
	position: "relative"
    },
});

const ProcessFormCard = ({ process, onClose }) => {
    const classes = useStyles();

    const [formData, setFormData] = useState(process ? process
					     : {
						 assunto: "",
						 interessados: [],
						 descricao: ""
					     }
					    );
    
    const handleChange = (event) => {
	setFormData(data => ({...data, [event.target.name]: event.target.value}));
    };

    const [novoInteressado, setNovoInteressado] = useState("");

    const handleNovoInteressadoChange = (event) => {
	setNovoInteressado(event.target.value);
    };

    const addNovoInteressado = () => {
	setFormData(data => ({...data, interessados: [...data.interessados, novoInteressado]}));
	setNovoInteressado("");
    };

    const handleSubmit = () => {
	const reqBody = {};
	Object.keys(formData).forEach(key => {
	    if (typeof process == "undefined" || formData[key] !== process[key]) {
		reqBody[key] = formData[key];
	    }
	});

	const options = {
	    headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	    },
	    body: JSON.stringify(reqBody)
	};

	// se estivermos editando um processo novo,
	// mandaremos um POST; caso contrário, um PATCH!
	if (typeof process == "undefined") {
	    options.method = "POST";
	    fetch("http://localhost:3000/processo/", options);
	} else {
	    options.method = "PATCH";
	    fetch("http://localhost:3000/processo/" + process.id, options);
	}

	onClose();
    };

    return (
	<Card>
	    <CardContent className={classes.relative}>
	    	<IconButton className={classes.closeButton}
			    onClick={onClose}>
	    	    <CloseIcon/>
	    	</IconButton>

		<Grid container
		      spacing={2}
		      alignItems="center">
		    <Grid item
			  xs={11}>
			<Typography className={classes.title}>
			    Cadastro de processo
			</Typography>
		    </Grid>

	    	    <Grid item
	    		  xs={5}>
			<TextField className={classes.textField}
				   value={formData.assunto}
				   name="assunto"
				   onChange={handleChange}
				   fullWidth
				   label="Assunto"/>
	    	    </Grid>

	    	    <Grid item
	    		  xs={7}>
	    	    </Grid>

	    	    <Grid item
	    		  xs={5}>
			<List subheader={
				  <ListSubheader disableGutters>
				      Interessados
				  </ListSubheader>
			      }>
			    {
				<Grid container
				      spacing={1}>
				    {
					formData.interessados.map(interessado =>
					    <Grid item
						  xs={6}>
						<Typography variant="body1">
						    {interessado}
						</Typography>
					    </Grid>
					)
				    }
				</Grid>
			    }
			</List>
	    	    </Grid>

		    <Grid item
			  xs={7}>
		    </Grid>

		    <Grid item
			  xs={5}>
			<TextField value={novoInteressado}
				   onChange={handleNovoInteressadoChange}
				   fullWidth
				   label="Novo interessado"/>
		    </Grid>

		    <Grid item
			  xs={2}>
			<Button className={classes.addButton}
				onClick={addNovoInteressado}
				variant="contained">
			    adicionar
			</Button>
		    </Grid>

		    <Grid item
			  xs={5}>
		    </Grid>

		    <Grid item
			  xs={10}>
			<TextField value={formData.descricao}
				   name="descricao"
				   onChange={handleChange}
				   fullWidth
				   label="Descrição"
				   multiline/>
		    </Grid>

		    <Grid item
			  xs={2}>
		    </Grid>

		    {/* guideline fine-tuning */}
		    {
			new Array(2).fill(
		    <Grid item
		    	  xs={12}>
		    </Grid>
			)
		    }

		    <Grid item
		     	  xs={10}>
		    </Grid>

		    <Grid item
			  xs={2}>
			<Button className={classes.saveButton}
				onClick={handleSubmit}
				variant="contained"
				fullWidth>
			    salvar
			</Button>
		    </Grid>

		</Grid>
	    </CardContent>
	</Card>
    );
};

export default ProcessFormCard;
