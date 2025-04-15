import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
    } else {
      setError("");
      console.log("Form submitted:", email);
    }
  };

  return (
    <>
      <h2>Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          style={{ fontSize: "18px", display: "block", marginBottom: "8px" }}
        >
          Enter your Email
        </label>
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required.",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid Email." },
          })}
          style={{
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <br />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <button
          style={{
            marginTop: "12px",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
