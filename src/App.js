import startServer from "./mirage.js";

startServer();

fetch('http://localhost:3000/processo/?q=')
    .then(res => res.json())
    .then(json => console.log(json));

function App() {
  return (
      <div> huzzah! </div>
  );
}

export default App;
