import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/actions";
import { useNavigate } from "react-router";

const Signupform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signupO = () => {
    const newUser = {
      fullName,
      email,
      password,
    };
    dispatch(signup(newUser));
    navigate("/dashboard");
  };
  return (
    <>
      <label>User name</label>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setFullName(e.target.value)}
      />
      <label>email</label>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setemail(e.target.value)}
      />
      <label>password</label>
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={signupO}>signup</button>
    </>
  );
};

export default Signupform;
