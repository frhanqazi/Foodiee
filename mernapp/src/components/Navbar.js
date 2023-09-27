import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './ContextReducer'
import Modal from '../Modal'
import Cart from '../screens/Cart'
export default function Navbar(props) {
  const [cartView, setCartView] = useState(false)
  localStorage.setItem('temp', 'first')
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('authToken')

    navigate('/login')
  }

  const loadCart = () => {
    setCartView(true)
  }

  const items = useCart()
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-danger position-sticky"
        style={{
          boxShadow: '0px 5px 10px black',
          filter: 'blur(20)',
          position: 'fixed',
          zIndex: '10',
          width: '100%',
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="/">
            Foodie!
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 mx-3 active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>{' '}
                {/* index.css - nav-link color white */}
              </li>
              {localStorage.getItem('authToken') ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 mx-3 active"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>{' '}
                  {/* index.css - nav-link color white */}
                </li>
              ) : (
                ''
              )}
            </ul>
            {!localStorage.getItem('authToken') ? (
              <form className="d-flex">
                <Link className="btn bg-white text-success mx-1 " to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-danger mx-1" to="/signup">
                  Signup
                </Link>
              </form>
            ) : (
              <div>
                <div
                  className="btn bg-success text-white mx-2 "
                  onClick={loadCart}
                >
                  Cart
                </div>

                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : (
                  ''
                )}

                <button
                  onClick={handleLogout}
                  className="btn bg-white text-danger mx-1"
                  style={{ backgroundColor: 'black' }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
