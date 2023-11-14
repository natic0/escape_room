import { useForm } from "react-hook-form";
import { useRef } from "react";
import { login } from "../../api/api";
import "./LoginForm.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const password = useRef(null);
  password.current = watch("password", "");

  const onSubmit = handleSubmit(async (data) => {
    try {
      let result = await login(data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    console.log("Login Successful");
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="header">
        <h1 className="header-text">Login</h1>
        <div className="underline"></div>
      </div>

      <div className="input">
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Email is not valid",
              },
            })}
          />
        </label>
        {errors.correo && <span>{errors.correo.message}</span>}
      </div>

      <div className="input">
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
        </label>
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      {/* <div className="input">
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          {...register("confirm_password", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
            minLength: {
              value: 8,
              message: "Confirm Password must have at least 8 characters",
            },
            validate: (value) =>
              value === password.current || "Passwords are not equal",
          })}
        />
        {errors.confirm_password && (
          <span>{errors.confirm_password.message}</span>
        )}
      </div> */}

      <button type="submit">Send</button>

      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </form>
  );
};

export default LoginForm;