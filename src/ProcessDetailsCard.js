import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import theme from "./theme.js";
import headerImage from "./imagemProcesso.svg";

const useStyles = makeStyles({
    ...theme,

    title : {
	...theme.title,
	color: theme.colors.black87,
    },

    subtitle: {
	...theme.subtitle,
	color: theme.colors.black54,
    },

    body: {
	...theme.body,
	color: theme.colors.black87,
    },

    widthfulImage: {
	width: "100%",
	maxWidth: "120px",
    },
    
    closeButton: {
	position: "absolute",
	right: "0",
	top: "0",
	fill: theme.colors.black54,
    },

    removeButton: {
	color: theme.colors.black54,
    },

    editButton: {
	color: theme.colors.primary,
	border: "1px solid " + theme.colors.primary,
    },

    relative: {
	position: "relative"
    },
    
    rightJustified: {
	justifyContent: "flex-end",
    }
});

const ProcessDetailsCard = ({ process, onClose, onDelete, onEdit }) => {
    const classes = useStyles();

    const createTypographyCombo = (title, body, headerFlag) => {
	return (
	    <>
		<Typography className={classes.subtitle}>
		    {title}
		</Typography>
		<Typography noWrap
			    className={headerFlag ? classes.title : classes.body}>
		    {body}
		</Typography>
	    </>
	);
    };
    
    return (
	<Card>
	    <CardContent className={classes.relative}>
		<IconButton className={classes.closeButton}
			    onClick={onClose}>
		    <CloseIcon/>
		</IconButton>

		<Grid container
		      spacing={2}>

		    {/* header */}
		    <Grid item
			  container
			  spacing={2}
			  alignItems="center">
			<Grid item
			      xs={4}>
			    <Box display="flex">
				<img className={classes.widthfulImage}
				     src={headerImage}/>
			    </Box>
			</Grid>

			<Grid item
			      xs={8}>
			    <Grid item
				  container
				  alignContent="center"
				  spacing={2}>
				<Grid item
				      xs={6}>
				    { createTypographyCombo("Processo", process.numero, "header") }
				</Grid>

				<Grid item
				      xs={6}>
				    { createTypographyCombo("Data", process.entrada, "header") }
				</Grid>

				<Grid item
				      xs={12}>
				    { createTypographyCombo("Assunto", process.assunto, "header") }
				</Grid>
			    </Grid>
			</Grid>
		    </Grid>

		    {/* body */}
		    <Grid item
			  container
			  spacing={1}
			  xs={12}>
			<Grid item
			      xs={12}>
			    <Typography className={classes.subtitle}>
				Interessados
			    </Typography>

			    <Grid container>
				{
			   	    process.interessados.map(interessado =>
			   		<Grid item
			   		      xs={6}
			   		      key={interessado}>
			   		    <Typography className={classes.body}>
			   			{interessado}
			   		    </Typography>
			   		</Grid>)
				}
			    </Grid>
			</Grid>

			<Grid item
			      xs={12}>
			    <Typography className={classes.subtitle}>
				Descrição
			    </Typography>
			    <Typography className={classes.body}>
				{process.descricao}
			    </Typography>
			</Grid>
		    </Grid>
		</Grid>
	    </CardContent>
	    
	    <CardActions className={classes.rightJustified}>
		<Button className={classes.removeButton}
			variant="outlined"
			onClick={onDelete}>
		    <Typography className={classes.buttonLabel}>
			Remover
		    </Typography>
		</Button>
		<Button className={classes.editButton}
			variant="outlined"
			onClick={onEdit}>
		    <Typography className={classes.buttonLabel}>
			Editar
		    </Typography>
		</Button>
	    </CardActions>
	</Card>
    );
};

export default ProcessDetailsCard;
