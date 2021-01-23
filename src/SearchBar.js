import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./theme.js";

const searchPlaceholder = "Pesquise por uma informação do processo";

const useStyles = makeStyles({
    ...theme,

    searchIcon: {
	fill: theme.colors.black54,
    },
    
    searchCard: {
	//minWidth: "464px",

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
		<Input className={classes.body}
		       value={query}
		       onChange={onChange}
		       fullWidth
		       disableUnderline
		       placeholder={searchPlaceholder}
		       endAdornment={
			   <InputAdornment>
			       <SearchIcon className={classes.searchIcon}/>
			   </InputAdornment>
		       }/>
	    </CardContent>
	</Card>
    );
};

export default SearchBar;
