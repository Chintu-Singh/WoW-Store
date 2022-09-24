import { useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import MinCategory from "../Layouts/MinCategory";
import Sidebar from "../User/Sidebar";
import Product from "./Product";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <>
      <MetaData title="Your Wishlist" />

      <MinCategory />
      <main className="w-full mt-12 sm:mt-0">
        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
          <Sidebar activeTab={"wishlist"} />

          <div className="flex-1 shadow bg-white">
            <div className="flex flex-col">
              <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">
                My Wishlist ({wishlistItems.length})
              </span>

              {wishlistItems.length === 0 && (
                <div className="flex items-center flex-col gap-2 m-6">
                  <span className="text-lg font-medium mt-6">No Items</span>
                  <img
                    draggable="false"
                    className="object-contain"
                    src="https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    alt="Empty Wishlist"
                  />
                  <p>Your wishlist is empty</p>
                </div>
              )}

              {wishlistItems
                .map((item, index) => <Product {...item} key={index} />)
                .reverse()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Wishlist;
