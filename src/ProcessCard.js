import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import theme from "./theme.js";
import cardImage from "./imagemProcesso.svg";

const useStyles = makeStyles({
    
    valueText: {
	
	...theme.fonts.body,
	
	color: theme.colors.black87,
	textTransform: "none",
	
    },
    
    keyText: {
	
	...theme.fonts.subtitle,
	
	color: theme.colors.black54,
	textTransform: "none",
	
    },
    
    highlightedText: {
	color: theme.colors.primary,
    },
    
    highlightedCard: {
	outline: "1px solid " + theme.colors.primary,
    },
    
    processCardContents: {
	
	padding: 16,
	"&:last-child": {
	    paddingBottom: 16,
	},
	
    },
    
    placeholderImage: {
	width: "100%",
	maxWidth: "84px",
    },
    
    processCard: {
	width: "100%",
    },
    
});

const ProcessCard = ({ process, shortened, highlighted }) => {
    
    const classes = useStyles();
    
    const createTypographyPair = (title, body) => {
	return (
	    <>
		
		<Typography className={`${classes.keyText} ${highlighted ? classes.highlightedText : ""}`}>
		    {title}
		</Typography>
		
		<Typography noWrap
			    className={`${classes.valueText} ${highlighted ? classes.highlightedText : ""}`}>
		    {body}
		</Typography>
		
	    </>
	);
    };
    
    return (
	<Card className={`${highlighted ? classes.highlightedCard : ""} ${classes.processCard}`}>
	    
	    <CardContent className={classes.processCardContents}>
		
		<Grid container
		      spacing={1}
		      alignItems="center">
		    
		    { shortened ? null
		      : <Grid item
			      xs={2}>
			    
			    <Box display="flex">
				
				<img className={classes.placeholderImage}
				     src={cardImage}
				     alt="Placeholder"/>
				
			    </Box>
			    
			</Grid>
		    }
		    
		    <Grid item
			  container
			  spacing={1}
			  alignItems="center"
			  xs={10}>
			
			<Grid item
			      xs={shortened ? 6 : 3}>
			    { createTypographyPair("Número", process.numero) }
			</Grid>
			
			<Grid item
			      xs={shortened ? 6 : 3}>
			    { createTypographyPair("Assunto", process.assunto) }
			</Grid>
			
			<Grid item
			      xs={shortened ? 6 : 3}>
			    { createTypographyPair("Interessado", process.interessados[0]) }
			</Grid>
			
			{ shortened ? null
			  :
			  <Grid item
				xs={3}>
			      { createTypographyPair("Descrição", process.descricao) }
			  </Grid>
			}
			
		    </Grid>
		    
		</Grid>
		
	    </CardContent>
	    
	</Card>
    );
};

export default ProcessCard;
