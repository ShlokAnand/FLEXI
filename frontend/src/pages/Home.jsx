import React from "react";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { addToCart } = useCart();

  // 8 products — displayed in a 4x2 grid
  const products = [
    {
      id: 1,
      name: "Red Rose Bouquet",
      price: 795,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-red-rose-bouquet-110406-m.jpg",
    },
    {
      id: 2,
      name: "Floral Bliss Cake With Elegant Roses",
      price: 1075,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-floral-bliss-cake-with-elegant-roses-bouquet-401664-m.jpg",
    },
    {
      id: 3,
      name: "Serene White Roses Bouquet",
      price: 595,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-serene-white-roses-bouquet-190881-m.jpg",
    },
    {
      id: 4,
      name: "Opulent Orchids Bouquet",
      price: 795,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-opulent-orchids-bouquet-109604-m.jpg",
    },
    {
      id: 5,
      name: "Beautiful Bunch of 15 White Roses",
      price: 875,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-beautiful-bunch-of-15-white-roses-61470-m.jpg",
    },
    {
      id: 6,
      name: "Elegant Exotic Lilies Arrangement",
      price: 1295,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-elegant-rose-bouquet-139330-m.jpg",
    },
    {
      id: 7,
      name: "Bouquet of Vibrant Mixed Flowers",
      price: 999,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-bouquet-of-10-pink-gerberas-6646-m.jpg",
    },
    {
      id: 8,
      name: "Clad in Pink Bunch",
      price: 650,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-clad-in-pink-bunch-153936-m.jpg",
    },
    {
      id: 9,
      name: "The Floral Wish",
      price: 650,
      image:
        "https://imgcdn.floweraura.com/the-floral-wish-usasd140.jpg?tr=w-315,dpr-1.5",
    },  
    {
      id: 10,
      name: "Sunflower Grace Bouquet",
      price: 770,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-sunflower-grace-bouquet-423552-m.jpg",
    },
    {
      id: 11  ,
      name: "Tranquil Blue Orchid Bouquet",
      price: 2999,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-tranquil-blue-orchid-bouquet-359400-m.jpg",
    },
    {
      id: 12,
      name: "Pastel Delight Hamper",
      price: 2550,
      image:
        "https://cdnnew.igp.com/f_auto,q_auto,t_pnopt7prodlp/products/p-pastel-delight-hamper-223308-m.jpg",
    },
      
];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Heading */}
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Flower Delivery in Nagpur
      </h1>
      <p style={{ color: "gray", marginBottom: "30px" }}>
        Choose from our exclusive range of fresh and handcrafted bouquets
      </p>

      {/* Product grid (4 columns, 2 rows) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
          justifyContent: "center",
          padding: "0 40px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "230px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h2 style={{ fontSize: "1.1rem", marginTop: "10px" }}>
              {product.name}
            </h2>
            <p style={{ fontWeight: "bold", margin: "8px 0" }}>
              ₹{product.price}
            </p>
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })
              }
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
