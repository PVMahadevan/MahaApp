import { Routes, Route } from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import JobDescription from "./screens/JobDescription";
import CustomerList from "./screens/CustomerList";
import MessageCenter from "./screens/MessageCenter";
import Candidates from "./screens/Candidates";
import History from "./screens/History";

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={
                        <Page title="">
                            <JobDescription />
                        </Page>
                    
                    }
                />
            
                <Route
                    path="customers/customer-list"
                    element={
                        <Page title="Customer list">
                            <CustomerList />
                        </Page>
                    }
                />
               
                <Route
                    path="message-center"
                    element={
                        <Page title="Message center">
                            <MessageCenter />
                        </Page>
                    }
                />
               
                 <Route
                    path="candidates"
                    element={
                        <Page title="">
                            <Candidates />
                        </Page>
                    }
                />
                 <Route
                    path="history"
                    element={
                        <Page title="">
                            <History />
                        </Page>
                    }
                />
               
            </Route>
        </Routes>
    );
}

export default App;
