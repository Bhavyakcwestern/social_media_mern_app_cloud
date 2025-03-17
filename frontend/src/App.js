import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/auth" component={AuthLayout} />
                {/* Add other routes like /dashboard or /home */}
            </Switch>
        </Router>
    );
};

export default App;
