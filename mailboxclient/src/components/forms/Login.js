import Button from "../elements/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../../constants/api-config";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(`${API}/api/user/login`, {
        userData: data,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form
        className="d-flex flex-column w-75 text-start"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label className="mt-2">Email</label>
        <input
          {...register("email", { required: true })}
          className="mt-2"
          name="email"
        />
        <label className="mt-2">Password</label>
        <input {...register("password", { required: true })} className="mt-2" />
        <Button
          className="w-25 mt-2 align-self-center btn btn-primary"
          context="Submit"
          type="submit"
        />
      </form>
    </div>
  );
};
export default Login;
