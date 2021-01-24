import { Grid } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import theme from "./theme.js";
import cardImage from "./imagemProcesso.svg";

const useStyles = makeStyles({
    ...theme,
    
    body: {
	...theme.body,
	color: theme.colors.black87,
	textTransform: "none",
    },

    subtitle: {
	...theme.subtitle,
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

    widthfulImage: {
	width: "100%",
	maxWidth: "84px",
    },

    processCard: {
	width: "100%",
    },
    
});

const ProcessCard = ({ process, shortened, highlighted }) => {
    const classes = useStyles();

    const createTypographyCombo = (title, body) => {
	return (
	    <>
		<Typography className={`${classes.subtitle} ${highlighted ? classes.highlightedText : ""}`}>
		    {title}
		</Typography>
		<Typography noWrap
			    className={`${classes.body} ${highlighted ? classes.highlightedText : ""}`}>
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
				<img className={classes.widthfulImage}
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
			    { createTypographyCombo("Número", process.numero) }
			</Grid>
			<Grid item
			      xs={shortened ? 6 : 3}>
			    { createTypographyCombo("Assunto", process.assunto) }
			</Grid>
			<Grid item
			      xs={shortened ? 6 : 3}>
			    { createTypographyCombo("Interessado", process.interessados[0]) }
			</Grid>
			{ shortened ? null
			  :
			  <Grid item
				xs={3}>
			      { createTypographyCombo("Descrição", process.descricao) }
			  </Grid>
			}
		      </Grid>
		  </Grid>
	      </CardContent>
	  </Card>
      );
};

export default ProcessCard;
