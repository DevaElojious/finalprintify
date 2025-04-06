import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth"; // Import auth context
import Layout from "./../components/Layout/Layout";
   
  const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product/${params.slug}`
      );
      if (data?.product) {
        setProduct(data.product);
        getSimilarProduct(data.product._id, data.product.category?._id);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`
      );
      if (data?.products) {
        setRelatedProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const addToCart = async (item) => {
       setCart([...cart, item]);
       localStorage.setItem("cart", JSON.stringify([...cart, item]));
       toast.success(`${item.name} added to cart!`);
       // Save to backend MongoDB
       try {
           const res = await fetch("http://localhost:5000/api/v1/cart/add", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${auth?.token}`, // Ensure auth?.token is available
               },
               body: JSON.stringify({ productId: item._id }), // Send only productId [cite: 270]
           });
           const data = await res.json();
           if (!data.success) {
               toast.error("Could not save cart to server");
           }
       } catch (err) {
           console.error("Error saving cart:", err);
           toast.error("Error saving cart to server");
       }
   };

  return (
    <Layout>
      <div className="row container mt-2 p-5">
        <div className="col-md-6">
          <img
            src={`http://localhost:5000/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product?.name || "Product"}
            height="500"
            width="100"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product?.name}</h6>
          <h6>Description: {product?.description}</h6>
          <h6>Price: ₹ {product?.price}</h6>
          <h6>Category: {product?.category?.name || "Unknown"}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => addToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h1>Similar Products</h1>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar products found.</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p?._id}>
              <img
                src={`http://localhost:5000/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p?.name || "Product"}
              />
              <div className="card-body">
                <h5 className="card-title">{p?.name}</h5>
                <p className="card-text">
                  {p?.description?.substring(0, 30)}...
                </p>
                <p className="card-text">₹ {p?.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p?.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => addToCart(p)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
