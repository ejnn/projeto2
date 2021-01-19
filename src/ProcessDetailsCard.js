import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    closeButton: {
	position: "absolute",
	right: "0",
    },
    rightJustified: {
	justifyContent: "flex-end",
    }
});

const ProcessDetailsCard = ({ process }) => {
    const classes = useStyles();
    
    return (
	<Card>
	    <CardContent>
		<IconButton className={classes.closeButton}>
		    <CloseIcon/>
		</IconButton>

		<Grid container
		      spacing="1">
		    {/* header */}
		    <Grid item
			  xs={6}>
			<Typography variant="subtitle1">
			    Processo
			</Typography>

			<Typography variant="h1">
			    {process.numero}
			</Typography>
		    </Grid>

		    <Grid item
			  xs={6}>
			<Typography variant="subtitle1">
			    Data
			</Typography>

			<Typography variant="h1">
			    {process.entrada}
			</Typography>
		    </Grid>

		    <Grid item
			  xs={12}>
			<Typography variant="subtitle1">
			    Assunto
			</Typography>

			<Typography variant="h1">
			    {process.assunto}
			</Typography>
		    </Grid>

		    {/* body */}
		    <Grid item
			  xs={12}>
			<Typography variant="subtitle1">
			    Interessados
			</Typography>

			<Grid container
			      spacing="1">
			    {
				process.interessados.map(interessado =>
				    <Grid item
					  xs={6}>
					<Typography variant="body1">
					    {interessado}
					</Typography>
				    </Grid>
				)
			    }
			</Grid>
		    </Grid>

		    <Grid item
			  xs={12}>
			<Typography variant="subtitle1">
			    Descrição
			</Typography>
			<Typography variant="body1">
			    {process.descricao}
			</Typography>
		    </Grid>
		</Grid>
	    </CardContent>

	    <CardActions className={classes.rightJustified}>
		<Button variant="outlined">
		    remover
		</Button>
		<Button variant="outlined">
		    editar
		</Button>
	    </CardActions>
	</Card>
    );
};

export default ProcessDetailsCard;
