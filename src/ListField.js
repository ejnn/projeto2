import { useState } from "react";

import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import theme from "./theme.js";

const useStyles = makeStyles({

    addButton: {
	
	...theme.fonts.buttonLabel,
	
	color: "white",
	
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

});

const ListField = ({ keyText, items, pushButtonLabel, push }) => {

    const classes = useStyles();
    
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
		
		<TextField className={classes.textField}
			   value={newItem}
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

export default ListField;
