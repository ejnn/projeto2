import { Grid } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import image from "./imagemCardGrande.svg";

const normalCardRecipe = {
    entries: {
	"Número": "numero",
	"Assunto": "assunto",
	"Interessado": "interessado",
	"Descrição": "descricao",
    },
    xs: 3,
}

const shortenedCardRecipe = {
    entries: {
	"Número": "numero",
	"Assunto": "assunto",
	"Interessado": "interessado",
    },
    xs: 6,
}

const createCardContents = (recipe, process) =>
<Grid item
      container
      alignItems="center"
      spacing={1}
      xs={10}>
    {
    	Object.keys(recipe.entries)
	    .map(key => 
		<Grid item
		      xs={recipe.xs}
		      key={key}>
    		    <Typography variant="subtitle1">
    			{key}
    		    </Typography>
		</Grid>
	    )
    }
    {
    	Object.values(recipe.entries)
	    .map(value => 
		<Grid item
		      xs={recipe.xs}
		      key={value}>
    		    <Typography variant="body1"
    				noWrap>
    			{process[value]}
    		    </Typography>
		</Grid>
	    )
    }
</Grid>;

const ProcessCard = ({ process, shortened }) => {
      return (
	  <Card>
	      <CardContent>
		  <Grid container
			alignItems="center"
			spacing={1}>
		      { shortened ? null
			:
			<Grid item
			      xs="auto">
			    <img src={image}/>
			</Grid>
		      }
		  {
		      createCardContents(
			  shortened ? shortenedCardRecipe :normalCardRecipe,
			  {...process, interessado: process["interessados"][0]})
		  }
		      </Grid>
	      </CardContent>
	  </Card>
      );
};

export default ProcessCard;
