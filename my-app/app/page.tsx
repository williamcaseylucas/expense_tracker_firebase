"use client";
import {
  addDoc,
  collection,
  // query,
  // onSnapshot,
  // querySnapshot,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useState, useEffect, MouseEventHandler } from "react";
import { db } from "./firebase";

type Items = {
  id: string;
  name: string;
  price: number;
};

export default function Home() {
  const [items, setItems] = useState<Items[]>([
    // { name: "Coffee", price: 4.95 },
    // { name: "Movie", price: 24.95 },
    // { name: "Candy", price: 7.95 },
  ]);
  const [newItem, setNewItem] = useState<Items>({
    name: "",
    price: 0,
    id: "0",
  });
  const [total, setTotal] = useState(0);

  // Add items to db
  const addItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== 0) {
      // Create new table by the name of items
      const docRef = await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ ...newItem, id: docRef.id }); // Add id to newItem
      setItems([...items, newItem]); // Store it here
      // console.log("newItem: ", newItem);
      // console.log("docRef.id: ", docRef.id);
    }
  };

  // Read items from db
  useEffect(() => {
    // const q = query(collection(db, "items"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   let itemsArr: Items[] = [];

    //   // Have to push the values in this way
    //   querySnapshot.forEach((doc) => {
    //     itemsArr.push({ ...doc.data(), id: doc.id } as Items);
    //   });
    //   setItems(itemsArr);
    //   console.log("items: ", items);
    //   console.log("itemsArr: ", itemsArr);
    // });

    const readDB = async () => {
      const querySnap = await getDocs(collection(db, "items"));
      let itemsArr: Items[] = [];
      querySnap.forEach((doc) => {
        // console.log("doc.id: ", doc.id);
        // console.log("doc.id: ", doc.data());
        itemsArr.push({ ...doc.data(), id: doc.id } as Items);
      });
      setItems(itemsArr);

      // Read total from itemsArr
      const calculatedTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => sum + item.price, 0);
        setTotal(totalPrice);
      };

      calculatedTotal();
    };
    readDB();
  }, [items]);

  // Delete items from db
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "items", id));
    setItems(items.filter((item) => item.id !== id)); // update the items by filtering out the clicked one
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
            />
            <input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: Number(e.target.value) })
              }
              className="col-span-2 p-3 border mx-3"
              type="text"
              placeholder="Enter $"
            />
            <button
              onClick={addItem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
