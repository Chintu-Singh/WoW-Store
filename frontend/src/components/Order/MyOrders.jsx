import { useEffect, useState } from "react";
import { myOrders, clearErrors } from "../../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import { useSnackbar } from "notistack";
import OrderItem from "./OrderItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import SearchIcon from "@mui/icons-material/Search";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";

const orderStatus = ["Processing", "Shipped", "Delivered"];
const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear()];

const MyOrders = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [status, setStatus] = useState("");
  const [orderTime, setOrderTime] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const { orders, loading, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, enqueueSnackbar]);

  useEffect(() => {
    if (loading === false) {
      setFilteredOrders(orders);
    }
  }, [loading, orders]);

  useEffect(() => {
    setSearch("");
    // console.log(status);
    // console.log(typeof orderTime);
    // console.log(orderTime);

    if (!status && +orderTime === 0) {
      setFilteredOrders(orders);
      return;
    }

    if (status && orderTime) {
      if (+orderTime === dt.getMonth()) {
        const filteredArr = orders.filter(
          (order) =>
            order.orderStatus === status &&
            new Date(order.createdAt).getMonth() === +orderTime
        );
        setFilteredOrders(filteredArr);
      } else {
        const filteredArr = orders.filter(
          (order) =>
            order.orderStatus === status &&
            new Date(order.createdAt).getFullYear() === +orderTime
        );
        setFilteredOrders(filteredArr);
      }
    } else if (!status) {
      if (+orderTime === dt.getMonth()) {
        const filteredArr = orders.filter(
          (order) => new Date(order.createdAt).getMonth() === +orderTime
        );
        setFilteredOrders(filteredArr);
      } else {
        const filteredArr = orders.filter(
          (order) => new Date(order.createdAt).getFullYear() === +orderTime
        );
        setFilteredOrders(filteredArr);
      }
    } else {
      const filteredArr = orders.filter(
        (order) => order.orderStatus === status
      );
      setFilteredOrders(filteredArr);
    }
    // eslint-disable-next-line
  }, [status, orderTime]);

  const searchOrders = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      enqueueSnackbar("Empty Input", { variant: "warning" });
      return;
    }
    const arr = orders.map((el) => ({
      ...el,
      orderItems: el.orderItems.filter((order) =>
        order.name.toLowerCase().includes(search.toLowerCase())
      ),
    }));
    setFilteredOrders(arr);
  };

  const clearFilters = () => {
    setStatus("");
    setOrderTime(0);
  };

  return (
    <>
      <MetaData title="My Orders" />

      <MinCategory />
      <main className="w-full mt-16 sm:mt-0">
        <div className="flex gap-3.5 mt-2 sm:mt-6 sm:mx-3 m-auto mb-7">
          <div className="hidden sm:flex flex-col w-1/5 px-1">
            <div className="flex flex-col bg-white rounded-sm shadow">
              <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                <p className="text-lg font-medium">Filters</p>
                <span
                  onClick={clearFilters}
                  className="text-blue-600 font-medium text-sm uppercase cursor-pointer hover:text-blue-700"
                >
                  clear all
                </span>
              </div>

              <div className="flex flex-col py-3 text-sm">
                <span className="font-medium px-4">TRACK YOUR ORDERS</span>

                <div className="flex flex-col gap-3 px-4 mt-1 pb-3 border-b">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="orderstatus-radio-buttons-group"
                      onChange={(e) => setStatus(e.target.value)}
                      name="orderstatus-radio-buttons"
                      value={status}
                    >
                      {orderStatus.map((el, i) => (
                        <FormControlLabel
                          value={el}
                          control={<Radio size="small" />}
                          key={i}
                          label={<span className="text-sm">{el}</span>}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>

              <div className="flex flex-col pb-2 text-sm">
                <span className="font-medium px-4">PREVIOUS ORDERS</span>

                <div className="flex flex-col gap-3 mt-1 px-4 pb-3">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="ordertime-radio-buttons-group"
                      onChange={(e) => setOrderTime(e.target.value)}
                      name="ordertime-radio-buttons"
                      value={orderTime}
                    >
                      {ordertime.map((el, i) => (
                        <FormControlLabel
                          value={el}
                          control={<Radio size="small" />}
                          key={i}
                          label={
                            <span className="text-sm">
                              {i === 0 ? "This Month" : el}
                            </span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex flex-col gap-3 sm:mr-4 overflow-hidden">
                <form
                  onSubmit={searchOrders}
                  className="flex items-center justify-between mx-1 sm:mx-0 sm:w-10/12 bg-white border rounded hover:shadow"
                >
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    name="search"
                    placeholder="Search your orders here"
                    className="p-2 text-sm outline-none flex-1 rounded-l"
                  />
                  <button
                    type="submit"
                    className="h-full text-sm px-1 sm:px-4 py-2.5 text-white bg-black hover:bg-blue-600 rounded-r flex items-center gap-1"
                  >
                    <SearchIcon sx={{ fontSize: "22px" }} />
                    Search
                  </button>
                </form>

                {orders && filteredOrders.length === 0 && (
                  <div className="flex items-center flex-col gap-2 p-8 bg-white">
                    <span className="text-lg font-medium">
                      No orders available
                    </span>
                    <img
                      draggable="false"
                      src="https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      alt="Empty Orders"
                    />
                  </div>
                )}

                {orders &&
                  filteredOrders
                    .map((order) => {
                      const {
                        _id,
                        orderStatus,
                        orderItems,
                        createdAt,
                        deliveredAt,
                      } = order;

                      return orderItems.map((item, index) => (
                        <OrderItem
                          {...item}
                          key={index}
                          orderId={_id}
                          orderStatus={orderStatus}
                          createdAt={createdAt}
                          deliveredAt={deliveredAt}
                        />
                      ));
                    })
                    .reverse()}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default MyOrders;
