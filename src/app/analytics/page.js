
"use client"
import { useEffect, useState } from "react";
 import PaidOrderChart from "@/components/layout/PaidOrderChart"
  import PieChart from "@/components/layout/PieChart"
import Loader from '@/components/layout/Loader';
import OrdersChart from '@/components/layout/OrdersChart';

import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from "@/components/UseProfile";

export default function Page() {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const { loading, data: profile } = useProfile();

    useEffect(() => {
        fetchOrders();
      }, []);
    
      function fetchOrders() {
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
          res.json().then(orders => {
            setOrders(orders.reverse());
            setLoadingOrders(false);
          })
        })
      }
    
  return (
    <section className="mt-8  max-w-2xl mx-auto">
             <UserTabs isAdmin={profile.admin} />
             {loadingOrders?<Loader/>
             :(
                <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center">
                 <div className='mt-10'>
             <PieChart  title="Order status" secondary={`Total Orders ${orders.length}`} orders={orders} />
             </div>
             <div className='mt-10'>
             <PaidOrderChart title="Orders Paid" secondary={`Total Orders ${orders.length}`} orders={orders} />

             </div>
             <div className='mt-10'>
             <OrdersChart title="Monthly orders" secondary={`Total Orders ${orders.length}`}  orders={orders} />
             </div> 
          </div>
             )
             
             
             }

 
  </section>

  )
}
