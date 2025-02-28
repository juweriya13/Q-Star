import React from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import Google from "../assets/Google";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthContainer() {
  const [selected, setSelected] = React.useState("login");

  const [value, setValue] = React.useState("");


  return (
    <div className="flex flex-col items-center w-full z-10 py-20">
      <Card className="max-w-full w-[340px]  p-3 box-border">
        <CardBody className="overflow-hidden">
          <h1 className="mb-7 text-2xl text-center">Authentication</h1>
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
            radius="full"
          >
            <Tab key="login" title="Login">
              <Login/>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <Signup/>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
