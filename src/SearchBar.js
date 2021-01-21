import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const searchPlaceholder = "  Pesquise por uma informação do processo";

const useStyles = makeStyles({
    searchCard: {
	padding: "8px",
	"&:last-child": {
	    paddingBottom: "8px",
	}
    }
});

const SearchBar = ({ query, onChange }) => {
    const classes = useStyles();
    
    return (
	<Card>
	    <CardContent className={classes.searchCard}>
		<Input value={query}
		       onChange={onChange}
		       fullWidth
		       disableUnderline
		       placeholder={searchPlaceholder}
		       endAdornment={
			   <InputAdornment>
			       <SearchIcon/>
			   </InputAdornment>
		       }/>
	    </CardContent>
	</Card>
    );
};

export default SearchBar;
