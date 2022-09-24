import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layouts/Loader";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";

const Account = () => {
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const getLastName = () => {
    const nameArray = user.name.split(" ");
    return nameArray[nameArray.length - 1];
  };

  return (
    <>
      <MetaData title="My Profile" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <MinCategory />
          <main className="w-full mt-12 sm:mt-0">
            <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
              <Sidebar activeTab={"profile"} />

              <div className="flex-1 overflow-hidden shadow bg-primary-lightblue">
                <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                  <div className="flex flex-col gap-5 items-start">
                    <span className="font-medium text-lg">
                      Profile Details{" "}
                      <Link
                        to="/account/update"
                        className="text-sm text-primary-blue font-medium ml-8 cursor-pointer"
                      >
                        Edit
                      </Link>
                    </span>

                    <div
                      className="flex flex-col sm:flex-row items-center gap-3"
                      id="personalInputs"
                    >
                      <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                        <label className="text-xs text-gray-500">Name</label>
                        <input
                          type="text"
                          value={user.name.split(" ", 1)}
                          className="text-sm outline-none border-none cursor-not-allowed text-gray-500"
                          disabled
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                        <label className="text-xs text-gray-500">Surname</label>
                        <input
                          type="text"
                          value={getLastName()}
                          className="text-sm outline-none border-none cursor-not-allowed text-gray-500"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm">Gender</h2>
                      <div className="flex items-center gap-8" id="radioInput">
                        <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                          <input
                            type="radio"
                            name="gender"
                            checked={user.gender === "male"}
                            id="male"
                            className="h-4 w-4 cursor-not-allowed"
                            disabled
                          />
                          <label htmlFor="male" className="cursor-not-allowed">
                            Male
                          </label>
                        </div>
                        <div className="flex items-center gap-4 inputs text-gray-500 cursor-not-allowed">
                          <input
                            type="radio"
                            name="gender"
                            checked={user.gender === "female"}
                            id="female"
                            className="h-4 w-4 cursor-not-allowed"
                            disabled
                          />
                          <label
                            htmlFor="female"
                            className="cursor-not-allowed"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 items-start">
                    <span className="font-medium text-lg">
                      Email Address
                      <Link
                        to="/account/update"
                        className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/password/update"
                        className="text-sm text-primary-blue font-medium ml-3 sm:ml-8"
                      >
                        Change Password
                      </Link>
                    </span>

                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                        <label className="text-xs text-gray-500">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="text-sm outline-none border-none cursor-not-allowed text-gray-500"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 items-start">
                    <span className="font-medium text-lg">
                      Mobile Number
                      <span
                        className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer"
                        id="mobEditBtn"
                      >
                        Edit
                      </span>
                    </span>

                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                        <label className="text-xs text-gray-500">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value="+919876543210"
                          className="text-sm outline-none border-none text-gray-500 cursor-not-allowed"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Account;
