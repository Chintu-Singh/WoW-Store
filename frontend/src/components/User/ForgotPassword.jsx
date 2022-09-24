import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import FormSidebar from "./FormSidebar";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
    }
  }, [dispatch, error, message, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Forgot Password" />

      {loading && <BackdropLoader />}
      <main className="w-full mt-12 sm:pt-20 sm:mt-0">
        <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
          <FormSidebar title="" tag="" />

          <div className="flex-1 overflow-hidden">
            <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">
              Forgot Password
            </h2>
            <div className="text-center py-10 px-4 sm:px-14">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-4">
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div className="flex flex-col gap-2.5 mt-2 mb-32">
                    <button
                      type="submit"
                      className="text-white py-3 w-full bg-black shadow rounded-sm font-medium"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>

              <Link
                to="/register"
                className="font-medium text-sm text-primary-blue"
              >
                Don't have an account? Create an account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
