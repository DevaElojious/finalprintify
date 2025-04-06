import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Layout from "./../components/Layout/Layout";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Get total price
  const totalPrice = () => {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  // Remove cart item
  const removeCartItem = (pid) => {
    let updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  // Directly proceed to payment
  const handlePayment = () => {
    if (!auth?.token) {
      return navigate("/login");
    }

    toast.success("Proceeding to payment...");
    navigate("/payment-qr");
  };

  // Generate invoice PDF
  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Printify Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Customer: ${auth?.user?.name || "Guest"}`, 14, 30);
    doc.text(`Address: ${auth?.user?.address || "N/A"}`, 14, 36);
    doc.text(`Email: ${auth?.user?.email || "N/A"}`, 14, 42);

    const tableColumn = ["Product", "Qty", "Price (in Rs.)", "Total (in Rs.)"];
    const tableRows = cart.map((item) => [
      item.name,
      "1",
      item.price,
      item.price,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50,
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    doc.text(`Grand Total: Rs.${total}`, 14, doc.lastAutoTable.finalY + 10);

    doc.save("invoice.pdf");
    toast.success("Invoice downloaded successfully!");
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center bg-light p-2 mb-1">
          Hello {auth?.user?.name || "Guest"}
        </h1>
        <h4 className="text-center">
          {cart.length
            ? `You have ${cart.length} item(s) in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : "Your Cart is Empty"}
        </h4>

        <div className="row">
          {/* Cart Items */}
          <div className="col-md-8">
            {cart.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="250"
                    height="250"
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                  <p>Price: ₹{p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <h4>Total: {totalPrice()} </h4>

            {/* Address Section */}
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth.user.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}

            {/* QR Code Payment */}
            <div className="mt-4 d-grid gap-2">
              {cart.length > 0 ? (
                <>
                  <button className="btn btn-success" onClick={generateInvoice}>
                    Download Invoice PDF
                  </button>
                  <button className="btn btn-primary" onClick={handlePayment}>
                    Proceed to Payment
                  </button>
                </>
              ) : (
                <p>Add items to your cart to proceed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
