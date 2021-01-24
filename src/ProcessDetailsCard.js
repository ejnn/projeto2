import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Card, CardContent, CardActions } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import theme from "./theme.js";
import placeholderImage from "./imagemProcesso.svg";

const useStyles = makeStyles({
    
    keyText: {
	
	...theme.fonts.subtitle,
	
	color: theme.colors.black54,
	
    },
    
    headerValueText: {
	
	...theme.fonts.title,
	
	color: theme.colors.black87,
	
    },
    
    valueText: {
	
	...theme.fonts.body,
	
	color: theme.colors.black87,
	
    },
    
    detailedPlaceholderImage: {
	width: "100%",
	maxWidth: "120px",
    },
    
    closeButton: {
	fill: theme.colors.black54,
	position: "absolute",
	right: "0",
	top: "0",
    },
    
    removeButton: {
	color: theme.colors.black54,
    },
    
    editButton: {
	color: theme.colors.primary,
	border: "1px solid " + theme.colors.primary,
    },
    
    cardContent: {
	position: "relative"
    },
    
    cardActions: {
	justifyContent: "flex-end",
    }
});

const ProcessDetailsCard = ({ process, onClose, onDelete, onEdit }) => {
    
    const classes = useStyles();
    
    const createTypographyPair = (title, body, headerFlag) => {
	return (
	    <>
		
		<Typography className={classes.keyText}>
		    {title}
		</Typography>
		
		<Typography noWrap
			    className={headerFlag ? classes.headerValueText : classes.valueText}>
		    {body}
		</Typography>
		
	    </>
	);
    };
    
    return (
	<Card>
	    
	    <CardContent className={classes.cardContent}>
		
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
				<img className={classes.detailedPlaceholderImage}
				     src={placeholderImage}
				     alt="Placeholder"/>
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
				    { createTypographyPair("Processo", process.numero, "header") }
				</Grid>
				
				<Grid item
				      xs={6}>
				    { createTypographyPair("Data", process.entrada, "header") }
				</Grid>
				
				<Grid item
				      xs={12}>
				    { createTypographyPair("Assunto", process.assunto, "header") }
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
			    
			    <Typography className={classes.keyText}>
				Interessados
			    </Typography>
			    
			    <Grid container>
				{
			   	    process.interessados.map(interessado =>
			   		<Grid item
			   		      xs={6}
			   		      key={interessado}>
			   		    <Typography className={classes.valueText}>
			   			{interessado}
			   		    </Typography>
			   		</Grid>)
				}
			    </Grid>
			    
			</Grid>
			
			<Grid item
			      xs={12}>
			    
			    <Typography className={classes.keyText}>
				Descrição
			    </Typography>
			    
			    <Typography className={classes.valueText}>
				{process.descricao}
			    </Typography>
			    
			</Grid>
			
		    </Grid>
		    
		</Grid>
		
	    </CardContent>
	    
	    <CardActions className={classes.cardActions}>
		
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
