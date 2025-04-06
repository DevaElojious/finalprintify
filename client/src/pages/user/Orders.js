import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]); // Holds the list of orders

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/orders", {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`,
          },
        });
        setOrders(data.orders); // Replace localStorage with dynamic data from backend
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Your Orders</h1>
            {orders.length === 0 ? (
              <div className="text-center">
                <h5>You have no orders yet!</h5>
              </div>
            ) : (
              orders.map((order, index) => (
                <div className="border shadow mb-3" key={order.id}>
                  <h5 className="p-3">
                    Order #{index + 1} -{" "}
                    <span className="text-warning">{order.status}</span>
                  </h5>
                  <p className="px-3">
                    Ordered on: {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product, idx) => (
                        <tr key={product._id}>
                          <td>{idx + 1}</td>
                          <td>{product.name}</td>
                          <td>₹{product.price}</td>
                          <td>{product.description.substring(0, 50)}...</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
