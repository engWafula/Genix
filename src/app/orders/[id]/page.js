"use client"
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import { FaPhoneAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import toast from "react-hot-toast";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { loading, data: profile } = useProfile();

  const { id } = useParams();
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id=' + id).then(res => {
        res.json().then(orderData => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      })
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  const handleCallCustomer = () => {
    if (order?.phone) {
      const phoneNumber = order.phone.replace(/\s/g, ''); // Remove spaces from phone number
      const telLink = `tel:${phoneNumber}`;
  
      // Open the default phone application with the provided phone number
      window.location.href = telLink;
    } else {
      console.error('Customer phone number not available.');
    }
  };
  



  async function handleCompleteOrder(str) {
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        body: JSON.stringify({
          _id: order._id,
          status: str, // Change 'completed' to the desired status value
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Processing...',
      success: `Order is ${str}`,
      error: 'Error',
    });

  }
  

  return (
    <section className="max-w-2xl mx-auto mt-8">
    <div className="text-center">
      {profile.admin ? (
        <SectionHeaders mainHeader="Created Order" />
      ) : (
        <SectionHeaders mainHeader="Your order" />
      )}
      <div className="mt-4 mb-8">
        {profile.admin ? (
          <>
            <p>Process this order for the client.</p>
            <div className="flex mt-4 space-x-2">
              <button
                onClick={handleCallCustomer}
                className="flex justify-center bg-primary items-center text-sm text-white px-3 py-2 rounded-full">
                <FaPhoneAlt className="mr-2" /> Call 
              </button>
              {order?.status === 'pending' ? (
                <>
                  <button
                    onClick={()=>handleCompleteOrder("processing")}
                    className="bg-gray-500 hover:bg-gray-500 text-white text-sm py-2 px-2 rounded-full flex items-center">
                    <FaCheckCircle className="mr-2" /> Process
                  </button>
                  <button
                    onClick={()=>handleCompleteOrder("completed")}
                    className="bg-green-500 hover:bg-green-700 text-white text-sm py-2 px-2 rounded-full flex items-center">
                    <FaCheckCircle className="mr-2" /> Complete
                  </button>
                </>
              ) : order?.status === 'canceled' ? (
                <>
                  <button
                    disabled
                    className="bg-gray-400 text-white text-sm py-2 px-2 rounded-full flex items-center"
                  >
                    <FaExclamationCircle className="mr-2" /> Order Cancelled
                  </button>
                </>
              ) :(
                <button
                disabled
                className="bg-green-500 hover:bg-green-700 text-white text-sm py-2 px-2 rounded-full flex items-center">
                <FaCheckCircle className="mr-2" /> Order Completed
              </button>
              )
              
              }
            </div>
          </>
        ) : (
          <>
            <p>Thanks for your order.</p>
            <p>We will call you when your order is on the way.</p>

            <div className="flex mt-4 space-x-2">
            {order?.status === 'pending' ? (
  <>
    <button
      onClick={() => handleCompleteOrder("canceled")}
      className="bg-gray-400 hover:bg-gray-400 text-white text-sm py-2 px-2 rounded-full flex items-center"
    >
      <FaCheckCircle className="mr-2" /> Cancel
    </button>
  </>
) : order?.status === 'canceled' ? (
  <>
    <button
      disabled
      className="bg-gray-400 text-white text-sm py-2 px-2 rounded-full flex items-center"
    >
      <FaExclamationCircle className="mr-2" /> Order Cancelled
    </button>
  </>
) : (
  <>
    <button
      disabled
      className="bg-green-500 hover:bg-green-700 text-white text-sm py-2 px-2 rounded-full flex items-center"
    >
      <FaCheckCircle className="mr-2" /> Order Completed
    </button>
  </>
)}
            </div>
          </>
        )}
      </div>
    </div>
    {loadingOrder && (
      <div>Loading order...</div>
    )}
    {order && (
      <div className="grid md:grid-cols-2 md:gap-16">
        <div>
          {order.cartProducts.map(product => (
            <CartProduct key={product._id} product={product} />
          ))}
          <div className="text-right py-2 text-gray-500">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-black font-bold">UGX {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span className="text-black font-bold">UGX 1000</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="text-black font-bold">
                UGX {subtotal + 5}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <AddressInputs
              disabled={true}
              addressProps={order}
            />
          </div>
        </div>
      </div>
    )}
  </section>
  );
}
