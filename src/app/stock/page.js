"use client"

import React from "react";
import { Table, Space } from "antd";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import Loader from '@/components/layout/Loader';
const { Column } = Table;

export default function Page() {
  const [categoryName, setCategoryName] = useState("");
  const [stock, setStock] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);
  const [totalStockCost, setTotalStockCost] = useState(0);

  useEffect(() => {
    Stock();
  }, []);

  function Stock() {
    fetch("/api/stock")
      .then((res) => res?.json())
      .then((stock) => {
        setStock(stock);
        calculateTotalStockCost(stock);
      });
  }

  function calculateTotalStockCost(stock) {
    const totalCost = stock.reduce((acc, item) => {
      return acc + item.quantity * item.unitPrice;
    }, 0);
    console.log(totalCost, "am total");
    setTotalStockCost(totalCost);
  }

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/stock/new"}>
          <span>Add stock</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="mt-8 text-md text-gray-500">Existing total stock</h2>
        <h2 className="mt-4 mb-3 text-sm text-gray-800">
          Stock total cost: UGX {totalStockCost}
        </h2>

        <Table dataSource={stock} rowKey="_id">
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Category" dataIndex="category" key="category" />
          <Column title="Quantity" dataIndex="quantity" key="quantity" />
          <Column title="Unit Price" dataIndex="unitPrice" key="unitPrice" />
        
        </Table>
      </div>
    </section>
  );
}
