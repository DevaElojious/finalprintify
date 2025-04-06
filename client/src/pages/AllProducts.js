import { Checkbox, Radio } from "antd";
   import axios from "axios";
   import React, { useEffect, useState } from "react";
   import toast from "react-hot-toast";
   import { useNavigate } from "react-router-dom";
   import Layout from "../components/Layout/Layout";
   import { Prices } from "../components/Prices";
   import { useCart } from "../context/cart";
   import FAQ from "../components/FAQ";
   import { useAuth } from "../context/auth"; // Import auth context
   
   const AllProducts = () => {
       const navigate = useNavigate();
       const [cart, setCart] = useCart();
       const [products, setProducts] = useState([]);
       const [categories, setCategories] = useState([]);
       const [checked, setChecked] = useState([]);
       const [radio, setRadio] = useState([]);
       const [total, setTotal] = useState(0);
       const [page, setPage] = useState(1);
       const [loading, setLoading] = useState(false);
       const [auth] = useAuth(); // Use auth context
   
       // Get all categories
       const getAllCategory = async () => {
           try {
               const { data } = await axios.get("http://localhost:5000/api/v1/category/get-category");
               if (data?.success) {
                   setCategories(data?.category);
                   toast.success("Categories loaded");
               }
           } catch (error) {
               console.log(error);
               toast.error("Failed to load categories");
           }
       };
   
       useEffect(() => {
           getAllCategory();
           getTotal();
       }, []);
   
       // Get all products
       const getAllProducts = async () => {
           try {
               setLoading(true);
               const { data } = await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`);
               setLoading(false);
               setProducts(data.products);
               toast.success("Products loaded");
           } catch (error) {
               setLoading(false);
               console.log(error);
               toast.error("Failed to load products");
           }
       };
   
       // Get total product count
       const getTotal = async () => {
           try {
               const { data } = await axios.get("http://localhost:5000/api/v1/product/product-count");
               setTotal(data?.total);
           } catch (error) {
               console.log(error);
               toast.error("Failed to load product count");
           }
       };
   
       // Load more products
       useEffect(() => {
           if (page === 1) return;
           loadMore();
       }, [page]);
   
       const loadMore = async () => {
           try {
               setLoading(true);
               const { data } = await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`);
               setLoading(false);
               setProducts([...products, ...data?.products]);
               toast.success("More products loaded");
           } catch (error) {
               console.log(error);
               setLoading(false);
               toast.error("Failed to load more products");
           }
       };
   
       // Filter by category
       const handleFilter = (value, id) => {
           let all = [...checked];
           if (value) {
               all.push(id);
           } else {
               all = all.filter((c) => c !== id);
           }
           setChecked(all);
       };
   
       useEffect(() => {
           if (!checked.length || !radio.length) getAllProducts();
       }, [checked.length, radio.length]);
   
       useEffect(() => {
           if (checked.length || radio.length) filterProduct();
       }, [checked, radio]);
   
       // Filter products
       const filterProduct = async () => {
           try {
               const { data } = await axios.post("http://localhost:5000/api/v1/product/product-filters", {
                   checked,
                   radio,
               });
               if (data?.products.length === 0) {
                   toast.error("No products found with selected filters");
               } else {
                   toast.success("Filter applied");
               }
               setProducts(data?.products);
           } catch (error) {
               console.log(error);
               toast.error("Failed to apply filters");
           }
       };
   
       // Add to cart handler
       const handleAddToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
        toast.error("Item already in cart");
    } else {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Item Added to Cart");
        // Send _id to server
        try {
            const res = fetch("http://localhost:5000/api/v1/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token}`,
                },
                body: JSON.stringify({ productId: product._id }), // Send _id
            });
        } catch (error) {
            console.error("Cart add error", error);
        }
    }
};

   
       return (
           <Layout title={"All Products - Best offers "}>
               <div className="container-fluid row mt-3">
                   <div className="col-md-2">
                       <h4 className="text-center">Filter By Category</h4>
                       <div className="d-flex flex-column">
                           {categories?.map((c) => (
                               <Checkbox
                                   key={c._id}
                                   onChange={(e) => handleFilter(e.target.checked, c._id)}
                               >
                                   {c.name}
                               </Checkbox>
                           ))}
                       </div>
                       <h4 className="text-center mt-4">Filter By Price</h4>
                       <div className="d-flex flex-column">
                           <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                               {Prices?.map((p) => (
                                   <div key={p._id}>
                                       <Radio value={p.array}>{p.name}</Radio>
                                   </div>
                               ))}
                           </Radio.Group>
                       </div>
                       <div className="d-flex flex-column">
                           <button
                               className="btn btn-danger"
                               onClick={() => {
                                   setChecked([]);
                                   setRadio([]);
                                   window.location.reload();
                               }}
                           >
                               RESET FILTERS
                           </button>
                       </div>
                   </div>
                   <div className="col-md-9">
                       <h1 className="text-center">All Products</h1>
                       <div className="d-flex flex-wrap">
                           {products?.map((p) => (
                               <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                   <img
                                       src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                                       className="card-img-top"
                                       alt={p.name}
                                   />
                                   <div className="card-body">
                                       <h5 className="card-title">{p.name}</h5>
                                       <p className="card-text">
                                           {p.description.substring(0, 30)}...
                                       </p>
                                       <p className="card-text"> ₹ {p.price}</p>
                                       <button
                                           className="btn btn-primary ms-1"
                                           onClick={() => navigate(`/product/${p.slug}`)}
                                       >
                                           More Details
                                       </button>
                                       <button
                                           className="btn btn-secondary ms-1"
                                           onClick={() => handleAddToCart(p)} // Use the defined function
                                       >
                                           ADD TO CART
                                       </button>
                                   </div>
                               </div>
                           ))}
                       </div>
                       <div className="m-2 p-3">
                           {products && products.length < total && (
                               <button
                                   className="btn btn-warning"
                                   onClick={(e) => {
                                       e.preventDefault();
                                       setPage(page + 1);
                                   }}
                               >
                                   {loading ? "Loading ..." : "Loadmore"}
                               </button>
                           )}
                       </div>
                   </div>
               </div>
               <div className="relative mt-16">
                   <div
                       className="absolute inset-0 bg-cover bg-center opacity-10"
                       style={{ backgroundImage: "url('/faq-background.jpg')" }}
                   ></div>
                   <div className="relative z-10 py-12 px-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
                       <FAQ />
                   </div>
               </div>
           </Layout>
       );
   };
   
   export default AllProducts;