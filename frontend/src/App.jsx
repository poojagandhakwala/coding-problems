import { Suspense } from "react";
import "./App.css";
import FetchData from "./FetchData";
import UpdateAddress from "./UpdateAddress";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Form from "./FormValidation";
import ToggleText from "./ToggleText";
import DownloadFile from "./DownloadFile";
import RateLimit from "./RateLimit";
import Pagination from "./Pagination";
import Caching from "./Caching";
import UserForm from "./User";
import { ThemeProvider } from "./Context/ThemeContext";
import About from "./About";

function App() {
  return (
    <>
        <Suspense fallback={<p>Loading app...</p>}>
        <ThemeProvider>
          <Navbar />
          <Routes>
            <Route path="/" Component={Navbar} />
            <Route path="/user" Component={UserForm} />
            <Route path="/caching" Component={Caching} />
            <Route path="/pagination" Component={Pagination} />
            <Route path="/rate-limit" Component={RateLimit} />
            <Route path="/file-download" Component={DownloadFile} />
            <Route path="/fetch-data" Component={FetchData} />
            <Route path="/update-address" Component={UpdateAddress} />
            <Route path="/form" Component={Form} />
            <Route path="/toggle" Component={ToggleText} />
            <Route path="/theme" Component={About} />
          </Routes>
      </ThemeProvider>
      </Suspense>

    </>
  );
}

export default App;
