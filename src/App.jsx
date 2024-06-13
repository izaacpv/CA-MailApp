import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { EmailIndex } from "./cmps/EmailIndex";
import "./assets/css/index.css";
import { EmailDetails } from "./cmps/EmailDetails";


function App() {
  return (
    <Router>
      <section className="main-app">
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/mail/inbox" />}/>
            <Route path="/mail" element={<Navigate to="/mail/inbox" />}/>
            <Route path="/mail/:folder" element={<EmailIndex />}>
              <Route path=":mailId" element={<EmailDetails />} />
            </Route>
          </Routes>
        </main>
      </section>
    </Router>
  );
}

export default App;
