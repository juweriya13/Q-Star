import React, { useState } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Google from "../assets/Google";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";

function Signup() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (fullname == "" || password == "" || email == "") {
        toast.error("Please fill all the fields");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/user/create`,
        {
          fullname,
          email,
          password,
        }
      );

      const { data } = response;

      localStorage.setItem("userToken", data.token);
      console.log("Signup successful", data);
      
      toast.success("Account created successfully");

      navigate("/");
    } catch (error) {
      console.error("Signup failed", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          isRequired
          label="Name"
          variant="flat"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          isRequired
          label="Email"
          type="email"
          variant="flat"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          isRequired
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
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

export default Signup;
