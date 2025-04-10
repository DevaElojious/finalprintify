import { Badge } from "antd";
import React from 'react';
import toast from 'react-hot-toast';
import { GiShop } from "react-icons/gi";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import useCategory from '../../hooks/useCategory';
import SearchInput from "../Form/SearchInput";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth, user:null,token:"",  
    })
    localStorage.removeItem('auth');
    toast.success('Logout Successful')
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" ><GiShop />  Printify</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">Home</NavLink>
              </li>
              <NavLink to="/all-products" className="nav-link">
                All Products
              </NavLink>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              
              {
                !auth.user? (<>
                <li className="nav-item">
                <NavLink to="/register" className="nav-link" href="#">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" href="#">Login</NavLink>
              </li>
                </>) : (<>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin': 'user'}`} className="dropdown-item">Dashboard</NavLink></li>
                      <li><NavLink onClick = {handleLogout} to="/login" className="dropdown-item">Log Out</NavLink></li>
                    </ul>
                  </li>                 
                </>)
              }
              <li className="nav-item">
              <Badge count={cart?.length} showZero className="custom-badge">
                <NavLink to="/cart" className="nav-link nav-link-cart">
                  Cart
                </NavLink>
              </Badge>
              </li>
              <li>
                <Link to="/faq" className="hover:text-black-600 font-medium">FAQ</Link>
              </li>


              <li className="nav-item">
                <NavLink to="/chatbot" className="nav-link "><TbMessageChatbotFilled size={24}/></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header