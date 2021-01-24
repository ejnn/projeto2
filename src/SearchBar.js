import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import theme from "./theme.js";

const useStyles = makeStyles({
    
    searchIcon: {
	fill: theme.colors.black54,
    },
    
    searchInput: {
	...theme.fonts.body,
    },
    
    searchCard: {
	
	padding: "8px",
	"&:last-child": {
	    paddingBottom: "8px",
	}
	
    }
    
});

const searchPlaceholder = "Pesquise por uma informação do processo";

const SearchBar = ({ query, onChange, inputRef }) => {
    
    const classes = useStyles();
    
    return (
	<Card>
	    
	    <CardContent className={classes.searchCard}>
		
		<Input className={classes.searchInput}
		       inputRef={inputRef}
		       value={query}
		       onChange={onChange}
		       fullWidth
		       disableUnderline
		       placeholder={searchPlaceholder}
		       endAdornment={
			   <InputAdornment>
			       <SearchIcon className={classes.searchIcon}/>
			   </InputAdornment>}/>
		
	    </CardContent>
	    
	</Card>
    );
};

export default SearchBar;
