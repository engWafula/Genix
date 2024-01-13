import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import {useEffect, useState} from "react";

export default function MenuItemForm({onSubmit,menuItem}) {
  const [name, setName] = useState(menuItem?.name || '');
  const [category, setCategory] = useState(menuItem?.category || '');
  const [unitPrice, setUnitPrice] = useState(menuItem?.unitPrice || null);
  const [quantity, setQuantity] = useState(menuItem?.quantity || null);


  return (
    <form
      onSubmit={ev =>
        onSubmit(ev, {
          name,category,unitPrice,quantity,
        })
      }
      className="mt-8 max-w-2xl mx-auto">
      <div
        className="flex items-center "
        
        >
     
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <label>Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={ev => setQuantity(ev.target.value)}
          />
           <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={ev => setCategory(ev.target.value)}
          />
          <label>Unit Price</label>
          <input
            type="text"
            value={unitPrice}
            onChange={ev => setUnitPrice(ev.target.value)}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}