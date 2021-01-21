import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchBar from "./SearchBar.js";

const searchPlaceholder = "  Pesquise por uma informação do processo";

const useStyles = makeStyles({
    searchCard: {
	padding: "8px",
	"&:last-child": {
	    paddingBottom: "8px",
	},
	
	minWidth: "520px",
    },
});

const HomePage = ({}) => {
    const classes = useStyles();
    
    return (
	<Box display="flex"
	     flexDirection="column"
	     justifyContent="center"
	     alignItems="center"
	     alignContent="center"
	     minHeight="100vh">
	    
	    <Typography variant="h1"
			align="center">
	   	Busca de processos
	    </Typography>
	    
	    <Box height="32px">
	    </Box>
	    
	    <SearchBar/>
	    
	    <Box height="64px">
	    </Box>
	    
	    <Typography variant="body1"
			align="center">
		Você pode criar um novo processo clicando aqui.
	    </Typography>
	</Box>
    );
};

export default HomePage;
