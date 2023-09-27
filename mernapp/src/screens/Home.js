import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

const Home = () => {
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/foodData', {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    response = await response.json()
    setFoodItems(response[0])
    setFoodCat(response[1])
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div style={{ backgroundColor: 'rgb(255, 204, 204)' }}>
      <div>
        <Navbar></Navbar>
      </div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade "
        data-bs-ride="carousel"
      >
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: '10' }}>
              <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x300/?burger"
                className="d-block w-100"
                alt="..."
                style={{ filter: 'brightness(30%)' }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x300/?pizza"
                className="d-block w-100"
                alt="..."
                style={{ filter: 'brightness(30%)' }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x300/?pasta"
                className="d-block w-100"
                alt="..."
                style={{ filter: 'brightness(30%)' }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {' '}
        {/* boootstrap is mobile first */}
        {foodCat != []
          ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className="row mb-3">
                  <div key={data.id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr
                    id="hr-success"
                    style={{
                      height: '4px',
                      backgroundImage:
                        '-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))',
                    }}
                  />
                  {foodItems != [] ? (
                    foodItems
                      .filter(
                        (items) =>
                          items.CategoryName === data.CategoryName &&
                          items.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems.id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            {console.log(filterItems.url)}
                            <Card
                              foodName={filterItems.name}
                              item={filterItems}
                              options={filterItems.options[0]}
                              ImgSrc={filterItems.img}
                            ></Card>
                          </div>
                        )
                      })
                  ) : (
                    <div> No Such Data </div>
                  )}
                </div>
              )
            })
          : ''}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Home
