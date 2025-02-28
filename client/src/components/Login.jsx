import React, { useState } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Google from "../assets/Google";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (password == "" || email == "") {
        toast.error("Please fill all the fields");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/user/login`,
        {
          email,
          password,
        }
      );

      const { data } = response;

      localStorage.setItem("userToken", data.token);
      document.cookie = "token=" + data.token;

      dispatch(login(data.user));
      toast.success("Logged in successfully");
      console.log("Logged in successfully...", data);

      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          isRequired
          label="Email"
          variant="flat"
          value={email}
          onValueChange={setEmail}
        />
        <Input
          isRequired
          label="Password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />

        <div className="flex gap-2 justify-end">
          <Button
            fullWidth
            color="primary"
            type="submit"
            disabled={loading}
            isLoading={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
        <h1 className="text-sm text-zinc-400 text-center">OR</h1>
        <div className="flex gap-2 justify-end">
          <Button
            fullWidth
            radius="lg"
            color="gray"
            className="border-zinc-700 border-2"
          >
            <Google />
            Continue with Google
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
