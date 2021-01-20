import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { List, ListSubheader } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    bottomPaddingless: {
	paddingBottom: "0",
    }
});

const ProcessFormCard = ({ process }) => {
    const classes = useStyles();
    
    return (
	<Card>
	    <CardHeader className={classes.bottomPaddingless}
			title="Cadastro de processo"
			titleTypographyProps={{variant: "h2"}}
			action={
	    		<IconButton>
	    		    <CloseIcon/>
	    		</IconButton>
			}/>
	    <CardContent>
		<Grid container
		      spacing={2}
		      alignItems="center">
	    	    <Grid item
	    		  xs={5}>
			<TextField fullWidth
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
			</List>
	    	    </Grid>

		    <Grid item
			  xs={7}>
		    </Grid>

		    <Grid item
			  xs={5}>
			<TextField fullWidth
				   label="Novo interessado"/>
		    </Grid>

		    <Grid item
			  xs={2}>
			<Button variant="contained">
			    adicionar
			</Button>
		    </Grid>

		    <Grid item
			  xs={5}>
		    </Grid>

		    <Grid item
			  xs={10}>
			<TextField fullWidth
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
			<Button variant="contained"
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
