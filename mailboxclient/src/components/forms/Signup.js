import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import axios from "axios";
import { API } from "../../constants/api-config";
import { Link } from "react-router-dom";
const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(`${API}/api/user/register`, {
        userData: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(45deg, #fbeded, transparent)",
        height: "90vh",
      }}
      className="container d-flex flex-column justify-content-center  align-items-center"
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="d-flex flex-column text-start"
        style={{ width: "60%" }}
      >
        <label className="mt-2">Name</label>
        <input
          style={{ width: "90%" }}
          type="text"
          {...register("name", { required: true })}
          className="mt-2 border rounded border-dark"
        />
        <label className="mt-2">Email</label>
        <input
          style={{ width: "90%" }}
          type="email"
          {...register("email", { required: true })}
          className="mt-2 border rounded border-dark"
        />
        <label className="mt-2">Phone</label>
        <input
          style={{ width: "90%" }}
          type="number"
          {...register("phone", { required: true })}
          className="mt-2 border rounded border-dark"
        />
        <label className="mt-2">Password</label>
        <input
          style={{ width: "90%" }}
          type="password"
          {...register("password", { required: true })}
          className="mt-2 border rounded border-dark"
        />
        <Button
          type="submit"
          context="Submit"
          className="text-center mt-2 btn btn-primary w-25 align-self-center"
        />
      </form>
      <div className="d-flex flex-column">
        <label>
          Already an account?<Link to="/login">Login</Link>
        </label>
        <a href="">Forgot Password</a>
      </div>
    </div>
  );
};
export default Signup;
