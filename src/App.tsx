import { NewsWidget } from "./components/NewsWidget";

import './App.css';

function App() {
  const apiKey: string = process.env.REACT_APP_NEWSAPI_KEY || '';

  return (
    <div className="App">
      <h1>NewsWidget Demo Container</h1>
      <NewsWidget apiKey={apiKey} />
    </div>
  );
}

export default App;
