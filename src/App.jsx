import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      <div>
        <h1>Hello from React!</h1>
      </div>
    </Authenticator>
  );
}

export default withAuthenticator(App);
