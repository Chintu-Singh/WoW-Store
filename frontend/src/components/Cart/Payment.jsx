import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceSidebar from "./PriceSidebar";
import Stepper from "./Stepper";
// import {
//     CardNumberElement,
//     CardCvcElement,
//     CardExpiryElement,
//     useStripe,
//     useElements,
// } from '@stripe/react-stripe-js';
import { clearErrors } from "../../actions/orderAction";
import { useSnackbar } from "notistack";
import { post } from "../../utils/paytmForm";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MetaData from "../Layouts/MetaData";

const Payment = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const stripe = useStripe();
  // const elements = useElements();
  // const paymentBtn = useRef(null);

  const [payDisable, setPayDisable] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const paymentData = {
    amount: Math.round(totalPrice),
    email: user.email,
    phoneNo: shippingInfo.phoneNo,
  };

  // const order = {
  //     shippingInfo,
  //     orderItems: cartItems,
  //     totalPrice,
  // }

  const submitHandler = async (e) => {
    e.preventDefault();

    // paymentBtn.current.disabled = true;
    setPayDisable(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      let info = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: data.paytmParams,
      };

      post(info);

      // if (!stripe || !elements) return;

      // const result = await stripe.confirmCardPayment(client_secret, {
      //     payment_method: {
      //         card: elements.getElement(CardNumberElement),
      //         billing_details: {
      //             name: user.name,
      //             email: user.email,
      //             address: {
      //                 line1: shippingInfo.address,
      //                 city: shippingInfo.city,
      //                 country: shippingInfo.country,
      //                 state: shippingInfo.state,
      //                 postal_code: shippingInfo.pincode,
      //             },
      //         },
      //     },
      // });

      // if (result.error) {
      //     paymentBtn.current.disabled = false;
      //     enqueueSnackbar(result.error.message, { variant: "error" });
      // } else {
      //     if (result.paymentIntent.status === "succeeded") {

      //         order.paymentInfo = {
      //             id: result.paymentIntent.id,
      //             status: result.paymentIntent.status,
      //         };

      //         dispatch(newOrder(order));
      //         dispatch(emptyCart());

      //         navigate("/order/success");
      //     } else {
      //         enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
      //     }
      // }
    } catch (error) {
      // paymentBtn.current.disabled = false;
      setPayDisable(false);
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Payment" />

      <main className="w-full mt-20">
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
          <div className="flex-1">
            <Stepper activeStep={3}>
              <div className="w-full bg-white">
                <form
                  onSubmit={(e) => submitHandler(e)}
                  autoComplete="off"
                  className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden"
                >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="payment-radio-group"
                      defaultValue="paytm"
                      name="payment-radio-button"
                    >
                      <FormControlLabel
                        value="googlepay"
                        control={<Radio />}
                        label={
                          <div className="flex items-center gap-4">
                            <img
                              draggable="false"
                              className="h-6 w-6 object-contain"
                              src="data:image/png;base64,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"
                              alt="Paytm Logo"
                            />
                            <span>Use Paytm</span>
                          </div>
                        }
                      />
                      <FormControlLabel
                        value="paytm"
                        control={<Radio />}
                        label={
                          <div className="flex items-center gap-4">
                            <img
                              draggable="false"
                              className="h-6 w-6 object-contain"
                              src="https://pbs.twimg.com/profile_images/1329113828731146242/FzxBBPrs_400x400.jpg"
                              alt="GooglePay Logo"
                            />
                            <span>Use GooglePay</span>
                          </div>
                        }
                      />
                      <FormControlLabel
                        value="phonepe"
                        control={<Radio />}
                        label={
                          <div className="flex items-center gap-4">
                            <img
                              draggable="false"
                              className="h-6 w-6 object-contain"
                              src="https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXJ93q6DZkmx07Er1o90PXYeo6mzL4VC2Gj9s"
                              alt="PhonePe Logo"
                            />
                            <span>Use PhonePe</span>
                          </div>
                        }
                      />
                    </RadioGroup>
                  </FormControl>

                  <input
                    type="submit"
                    value={`PAY ₹${totalPrice.toLocaleString()}`}
                    disabled={payDisable ? true : false}
                    className={`${
                      payDisable
                        ? "bg-primary-grey cursor-not-allowed"
                        : "bg-black cursor-pointer"
                    } w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`}
                  />
                </form>
              </div>
            </Stepper>
          </div>

          <PriceSidebar cartItems={cartItems} />
        </div>
      </main>
    </>
  );
};

export default Payment;
