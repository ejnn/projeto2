import { useState } from "react";

import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ProcessFormCard from "./ProcessFormCard.js";

import theme from "./theme.js";

import SearchBar from "./SearchBar.js";

const searchPlaceholder = "  Pesquise por uma informação do processo";

const useStyles = makeStyles({
    ...theme,
    
    headline: {
	...theme.headline,
	color: theme.colors.primary,
    },
    
    newProcessLink: {
	...theme.body,
	color: theme.colors.primary,
	textDecoration: "underline",
	fontWeight: "bold",
    }
});

const HomePage = ({}) => {
    const classes = useStyles();
    
    const [modal, setModal] = useState(false);
    
    const handleModalOpen = () => {
	setModal(true);
    };
    
    const handleModalClose = () => {
	setModal(false);
    };
    
    return (
	<Box display="flex"
	     flexDirection="column"
	     justifyContent="center"
	     alignItems="center"
	     alignContent="center"
	     minHeight="100vh">
	    
	    <Typography className={classes.headline}>
	   	Busca de processos
	    </Typography>
	    
	    <Box height="32px">
	    </Box>
	    
	    <Box width="464px">
		<SearchBar/>
	    </Box>
	    
	    <Box height="64px">
	    </Box>
	    
	    <Typography className={classes.body}>
		Você pode criar um novo processo <Link className={classes.newProcessLink}
						       onClick={handleModalOpen}
						       component="span">clicando aqui</Link>.
	    </Typography>
	    
	    <Modal open={modal}
		   onClose={handleModalClose}>
		<Box display="flex"
		     flexDirection="column"
		     justifyContent="center"
		     alignItems="center"
		     alignContent="center"
		     m={8}>
		    <ProcessFormCard onClose={handleModalClose}/>
		</Box>
	    </Modal>
	</Box>
    );
};

export default HomePage;
