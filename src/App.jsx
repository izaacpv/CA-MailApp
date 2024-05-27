import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { EmailIndex } from "./cmps/EmailIndex";
import { AppHeader } from "./cmps/AppHeader";
import { HomePage } from "./cmps/HomePage";
import { AboutUs } from "./cmps/AboutUs";
import './assets/css/index.css'
import { EmailDetails } from "./cmps/EmailDetails";

function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/mail" element={ <EmailIndex/> }/>
            <Route path="/mail/:mailId" element={ <EmailDetails/> }/>
          </Routes>
        </main>
      </section>
    </Router>
  );
}

export default App;
