import { useState } from "react";

import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";

import ProcessFormCard from "./ProcessFormCard.js";

import theme from "./theme.js";

import SearchBar from "./SearchBar.js";

const useStyles = makeStyles({
    
    pageTitle: {
	
    	...theme.fonts.headline,
	
    	color: theme.colors.primary,
	
    },
    
    pageSubtitle: {
	...theme.fonts.body,
    },
    
    newProcessLink: {
	
	...theme.fonts.body,
	
	color: theme.colors.primary,
	textDecoration: "underline",
	fontWeight: "bold",
	
    }
});

const HomePage = ({...props}) => {
    
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
	    
	    <Typography className={classes.pageTitle}>
	   	Busca de processos
	    </Typography>
	    
	    <Box height="32px">
	    </Box>
	    
	    <Box width="464px">
		<RouterLink to="/consulta">
		    <SearchBar/>
		</RouterLink>
	    </Box>
	    
	    <Box height="64px">
	    </Box>
	    
	    <Typography className={classes.pageSubtitle}>
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
