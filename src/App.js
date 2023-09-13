import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import JobDescription from "./screens/JobDescription";
import CustomerList from "./screens/CustomerList";
import MessageCenter from "./screens/MessageCenter";
import Candidates from "./screens/Candidates";
import History from "./screens/History";
import Interview360 from "./screens/Interview360";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import { useContext } from "react";
import KeycloakContext from "./keycloakContext";

function App() {
    const { keycloakInstance, authenticated } = useContext(KeycloakContext)
    if (authenticated) {

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
                        index
                        path="roleforgejd/jd"
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
                        path="interview360"
                        element={
                            <Page title="Interview360">
                                <Interview360 />
                            </Page>
                        }
                    />

                    <Route
                        path="roleforgejd/candidates"
                        element={
                            <Page title="">
                                <Candidates />
                            </Page>
                        }
                    />
                    <Route
                        path="roleforgejd/history"
                        element={
                            <Page title="">
                                <History />
                            </Page>
                        }
                    />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;