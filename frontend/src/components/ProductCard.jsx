// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden group">
      <div className="relative">
        {product.badge && (
          <div className="absolute left-3 top-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
            {product.badge}
          </div>
        )}
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-56 object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <button
          onClick={() => onAdd(product)}
          className="absolute right-3 bottom-3 bg-white px-3 py-2 rounded-full shadow text-sm"
          title="Quick Add"
        >
          + Add
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 truncate">{product.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold">₹{product.price}</div>
          <div className="text-xs text-slate-500">Free delivery</div>
        </div>
      </div>
    </div>
  );
}
