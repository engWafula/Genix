'use client';
import {CartContext, cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import {useProfile} from "@/components/UseProfile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { FaMoneyBillAlt } from "react-icons/fa"
export default function CartPage() {
  const {cartProducts,removeCartProduct,clearCart} = useContext(CartContext);
  const [address, setAddress] = useState({});
  const {data:profileData} = useProfile();
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const {phone, streetAddress, city, postalCode, country} = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({...prevAddress, [propName]:value}));
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          const info = await response.json();
          console.log(info.orderDoc._id,"am orders")
           router.push(`orders/${info.orderDoc._id}`)
           clearCart()
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Order made successfully...',
      error: 'Something went wrong... Please try again later',
    })
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {cartProducts?.length === 0 && <div>No products in your shopping cart</div>}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct key={index} product={product} onRemove={removeCartProduct} />
          ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:<br />
              Delivery:<br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              UGX {subtotal}<br />
              UGX 1000<br />
              UGX {subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs addressProps={address} setAddressProp={handleAddressChange} />
            <div className="flex  flex-col items-center mt-4">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                Order for UGX {subtotal + 1000}
              </button>
              <span className="ml-2 mt-2 flex items-center text-gray-600">
                <FaMoneyBillAlt style={{ fontSize: "1.5em" }} />{" "}
                <span className="ml-1">Pay on delivery</span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}