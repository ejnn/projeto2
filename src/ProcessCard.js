import { Grid } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const normalCardRecipe = {
    entries: {
	numero: "Número",
	assunto: "Assunto",
	interessado: "Interessado",
	descricao: "Descrição",
    },
    xs: 3,
}

const shortenedCardRecipe = {
    entries: {
	numero: "Número",
	assunto: "Assunto",
	interessado: "Interessado",
    },
    xs: 6,
}

const createCardContents = (recipe, process) =>
<Grid container
      justify="space-between"
      alignItems="center"
      spacing="1">
    {
    	Object.keys(recipe.entries)
	    .map(key => 
		<Grid item
		      xs={recipe.xs}
		      key={key}>
    		    <Typography variant="subtitle1">
    			{recipe.entries[key]}
    		    </Typography>
    		    <Typography variant="body1"
    				noWrap>
    			{process[key]}
    		    </Typography>
		</Grid>
	    )
    }
</Grid>;

const ProcessCard = ({ process, shortened }) => {
      return (
	  <Card>
	      <CardContent>
		  {
		      createCardContents(
			  shortened ? shortenedCardRecipe :normalCardRecipe,
			  {...process, interessado: process["interessados"][0]})
		  }
	      </CardContent>
	  </Card>
      );
};

export default ProcessCard;
