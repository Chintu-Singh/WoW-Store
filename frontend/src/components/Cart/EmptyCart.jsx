import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex items-center flex-col gap-2 m-6">
      <div className="w-100 h-100">
        <span className="text-lg">Your don't have any items in your cart</span>
        <img
          draggable="false"
          className="w-full h-full object-contain"
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="Empty Cart"
        />
      </div>
      <Link
        to="/products"
        className="bg-black text-sm text-white px-12 py-2 rounded-sm shadow mt-3"
      >
        Start adding items to it
      </Link>
    </div>
  );
};

export default EmptyCart;
