import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Card, CardContent } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const searchPlaceholder = "  Pesquise por uma informação do processo";

const useStyles = makeStyles({
    paddingless: {
	padding: 0,
	"&:last-child": {
	    paddingBottom: 0,
	}
    }
});

const SearchBar = ({}) => {
    const classes = useStyles();
    
    return (
	<Grid container
	      alignItems="center"
	      spacing={2}>
	    <Grid item
		  xs={2}>
		<Typography variant="h2"
			    align="center">
		    Busca de processos
		</Typography>
	    </Grid>
	    <Grid item
		  xs={5}>
		<Card>
		    <CardContent className={classes.paddingless}>
			<Input fullWidth
			       disableUnderline
			       placeholder={searchPlaceholder}
			       endAdornment={
				   <InputAdornment>
				       <SearchIcon/>
				   </InputAdornment>
			       }/>
		    </CardContent>
		</Card>
	    </Grid>
	    <Grid item
		  xs={2}>
		<Button variant="outlined"
			fullWidth>
		    novo
		</Button>
	    </Grid>
	</Grid>
    );
};

export default SearchBar;
