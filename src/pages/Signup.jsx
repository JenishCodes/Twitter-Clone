import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { AuthContext } from "../context";
import { signup } from "../services/user";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignup = () => {
    if (!email || !password || !name || !username) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    signup(name, email, password, username)
      .then((user) => {
        setUser(user)
        navigate("/home")
    })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (error) setTimeout(() => setError(""), 5000);
  }, [error]);

  return (
    <div className="signup py-3">
      <Helmet>
        <title>Signup for Twitter / Twitter</title>
      </Helmet>
      {loading ? (
        <Modal
          style={{
            right: 0,
            position: "absolute",
            width:
              window.screen.width > 991
                ? (window.screen.width * 5) / 12
                : "100%",
          }}
        >
          <Loading
            show={true}
            className="my-5 text-app"
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        </Modal>
      ) : null}
      {error ? (
        <div
          className="text-white bg-danger rounded-3 p-2 position-absolute"
          style={{ width: "300px", left: "50%", transform: "translateX(-50%)" }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <i className="bi bi-exclamation-circle fs-2"></i>
              <div className="ms-2">{error}</div>
            </div>
            <div
              onClick={() => setError("")}
              className="btn-close pointer btn-close-white me-2 m-auto"
            ></div>
          </div>
        </div>
      ) : null}
      <div
        className="p-3 pt-0 d-flex justify-content-center"
        style={{ fontSize: "30px" }}
      >
        <Link to="/">
          <div className="me-4">
            <i className="bi bi-twitter"></i>
          </div>
        </Link>
        <div className="fw-bold">Create your account</div>
      </div>
      <div className="m-auto mt-4" style={{ width: "300px" }}>
        <div className="mb-5">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control rounded-5 border"
              id="name-input"
              style={{ backgroundColor: "transparent" }}
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
              autoComplete="off"
            />
            <label htmlFor="name-input">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="account"
              className="form-control rounded-5 border"
              id="account-input"
              style={{ backgroundColor: "transparent" }}
              onChange={(e) => setUsername(e.currentTarget.value)}
              value={username}
              autoComplete="off"
            />
            <label htmlFor="account-input">Account Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-5 border"
              id="email-input"
              style={{ backgroundColor: "transparent" }}
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
              autoComplete="off"
            />
            <label htmlFor="email-input">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-5 border"
              id="password-input"
              style={{ backgroundColor: "transparent" }}
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
              autoComplete="off"
            />
            <label htmlFor="password-input">Password</label>
          </div>
          <div
            onClick={handleSignup}
            className="btn hover d-flex px-5 my-4 py-1 justify-content-center align-items-center rounded-pill border"
          >
            Sign up
          </div>
          <div className="text-muted mt-4">
            Already have an account?{" "}
            <Link className="hover-underline" to="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}