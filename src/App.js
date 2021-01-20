import { useState, useEffect } from "react";

import startServer from "./mirage.js";

import ProcessCard from "./ProcessCard.js";
import ProcessDetailsCard from "./ProcessDetailsCard.js";
import SearchBar from "./SearchBar.js";
import ProcessFormCard from "./ProcessFormCard.js";
import HomePage from "./HomePage.js";
import ProcessConsultationPage from "./ProcessConsultationPage.js";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "@fontsource/montserrat";

const theme = createMuiTheme({
    typography: {
	fontFamily: '"Montserrat"',
	
	// Headline
	h1: {
	    fontFamily: '"Montserrat"',
	    fontSize: "24px",
	    fontWeight: 400,
	},
	
	// Title
	h2: {
	    fontFamily: '"Montserrat"',
	    fontSize: "20px",
	    fontWeight: 400,
	},
	
	// Subtitle
	subtitle1: {
	    fontFamily: '"Montserrat"',
	    fontSize: "14px",
	    fontWeight: 700,
	},
	
	// Body
	body1: {
	    fontFamily: '"Montserrat"',
	    fontSize: "16px",
	    fontWeight: 400,
	},
	
	// Button label
	button: {
	    fontFamily: '"Montserrat"',
	    fontSize: "14px",
	    fontWeight: 700,
	},
    },
});

startServer();

function App() {
    const [process, setProcess] = useState({
	numero: "",
	entrada: "",
	descricao: "",
	assunto: "",
	interessados: [],
    });
    
    useEffect(() => {
	fetch('http://localhost:3000/processo/?q=')
	    .then(res => res.json())
	    .then(json => {
		console.log(json);
		setProcess(json.processos[0]);
	    });
    }, []);
    
    return (
	    <ThemeProvider theme={theme}>
	    <ProcessConsultationPage/>
	    </ThemeProvider>
    );
}

export default App;
