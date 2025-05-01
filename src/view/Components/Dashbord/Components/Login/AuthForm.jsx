import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import profile from "../images/profile.jpg";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (isLogin) {
      const userData = JSON.parse(localStorage.getItem(data.email));

      if (userData && userData.password === data.password) {
        localStorage.setItem("currentUser", JSON.stringify(userData));
        toast.success(`Welcome ${userData.name} sucessfully logged in! `);
        setTimeout(() => {
          navigate("");
        }, 1500);
      } else {
        toast.error("Invalid email or password.");
      }
    } else {
      localStorage.setItem(data.email, JSON.stringify(data));
      toast.success("Registered successfully!");
      reset();
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <div className="profile-section">
          <img src={profile} alt="admin-profile" className="profile-img" />
          <h2 className="admin-name">{isLogin ? "Login" : "Register"}</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span style={{ color: "red" }}>Name is required</span>
              )}
            </div>
          )}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span style={{ color: "red" }}>Email is required</span>
            )}
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span style={{ color: "red" }}>Password is required</span>
            )}
          </div>
          {!isLogin && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span style={{ color: "red" }}>Address is required</span>
                )}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Role"
                  {...register("role", { required: true })}
                />
                {errors.role && (
                  <span style={{ color: "red" }}>Role is required</span>
                )}
              </div>
            </>
          )}
          <input
            type="submit"
            value={isLogin ? "Login" : "Register"}
            style={{ backgroundColor: "#a1eafb", fontSize: "19px" }}
          />
        </form>
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              color: "#007bff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
