import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import axios from "axios";
import { API } from "../../constants/api-config";
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
    <div className="container">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="d-flex flex-column justify-content-center align-items-center text-start"
      >
        <label>Name</label>
        <input type="text" {...register("name", { required: true })} />
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />
        <label>Phone</label>
        <input type="number" {...register("phone", { required: true })} />
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        <Button type="submit" context="Submit" />
      </form>
    </div>
  );
};
export default Signup;
