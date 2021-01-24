import { useState } from "react";

import { Grid } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import theme from "./theme.js";

const useStyles = makeStyles({
    
    cardTitle: {
	
	...theme.fonts.title,
	
	color: theme.colors.black87,
	paddingBottom: "0",
	
    },
    
    keyText: {
	
	...theme.fonts.subtitle,
	
	color: theme.colors.black54,
	
    },
    
    valueText: {
	
	...theme.fonts.body,
	
	color: theme.colors.black87,
	
    },
    
    textField: {
	
	"& .MuiInputBase-root": {
	    
	    ...theme.fonts.body,
	    
	    color: theme.colors.black87,
	    
	},
	
	"& .MuiFormLabel-root": {
	    
	    ...theme.fonts.subtitle,
	    
	    color: theme.colors.black54,
	    
	}
	
    },
    
    closeButton: {
	fill: theme.colors.black54,
	position: "absolute",
	right: "0",
	top: "0",
    },
    
    addButton: {
	
	...theme.fonts.buttonLabel,
	
	color: "white",
	
    },
    
    saveButton: {
	
	...theme.fonts.buttonLabel,
	
	backgroundColor: theme.colors.primary,
	color: "white",
	
    },
    
    formCard: {
	
	position: "relative",
	
	"&.MuiPaper-root": {
	    overflow: "auto",
	},
	
    },
    
});

const ProcessFormCard = ({ process, onClose }) => {
    
    const classes = useStyles();
    
    const [formData, setFormData] = useState(
	process
	    ? process
	    : {
		assunto: "",
		interessados: [],
		descricao: ""
	    }
    );
    
    const handleChange = (event) => {
    	setFormData(data => ({...data, [event.target.name]: event.target.value}));
    };
    
    const pushNovoInteressado = (novoInteressado) => {
	setFormData(data => ({...data, interessados: [...data.interessados, novoInteressado]}));
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
	
	// se estivermos criando um processo novo, mandaremos um POST.
	// se não, estamos editando um processo existente; mandaremos um PATCH.
	if (typeof process == "undefined") {
	    options.method = "POST";
	    fetch("http://localhost:3000/processo/", options);
	} else {
	    options.method = "PATCH";
	    fetch("http://localhost:3000/processo/" + process.id, options);
	}
	
	onClose();
    };
    
    const ListField = ({ keyText, items, pushButtonLabel, push }) => {
	const [newItem, setNewItem] = useState("");
	
	const handleNewItemChange = (event) => {
	    setNewItem(event.target.value);
	};
	
	const handlePush = () => {
	    push(newItem);
	    setNewItem("");
	};
	
	return (
	    <>
	    	<Grid item
	    	      xs={5}>
		    
		    <Typography className={classes.keyText}>
			{ keyText }
		    </Typography>
		    
		    {
			<Grid container
			      spacing={1}>
			    {
				items.map(item =>
				    <Grid item
					  xs={6}
					  key={item}>
					<Typography className={classes.valueText}>
					    {item}
					</Typography>
				    </Grid>
				)
			    }
			</Grid>
		    }
		    
	    	</Grid>
		
		<Grid item
		      xs={7}>
		</Grid>
		
		<Grid item
		      xs={5}>
		    
		    <TextField value={newItem}
			       onChange={handleNewItemChange}
			       fullWidth
			       label={pushButtonLabel}/>
		    
		</Grid>
		
		<Grid item
		      xs={2}>
		    
		    <Button className={classes.addButton}
			    onClick={handlePush}
			    variant="contained">
			adicionar
		    </Button>
		    
		</Grid>
		
		<Grid item
		      xs={5}>
		</Grid>
	    </>
	);
    };
    
    return (
	<Card className={classes.formCard}>
	    
	    <CardContent className={classes.cardContent}>
		
	    	<IconButton className={classes.closeButton}
			    onClick={onClose}>
	    	    <CloseIcon/>
	    	</IconButton>
		
		<Grid container
		      spacing={2}
		      alignItems="center">
		    
		    <Grid item
			  xs={12}>
			<Typography className={classes.cardTitle}>
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
				   multiline
				   label="Assunto"/>
	    	    </Grid>
		    
		    {/* row filler whitespace */}
	    	    <Grid item
	    		  xs={7}>
	    	    </Grid>
		    
		    <ListField keyText="Interessados"
			       items={formData.interessados}
			       pushButtonLabel="Novo interessado"
			       push={pushNovoInteressado}/>
		    
		    <Grid item
			  xs={10}>
			
			<TextField className={classes.textField}
				   value={formData.descricao}
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
