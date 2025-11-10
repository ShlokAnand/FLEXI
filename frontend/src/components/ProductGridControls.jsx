// src/components/ProductGridControls.jsx
import React from "react";

export default function ProductGridControls({ q, setQ, tag, setTag, sort, setSort, tags }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-64 p-3 rounded-lg border"
        />
        <select value={tag} onChange={(e)=>setTag(e.target.value)} className="p-3 rounded-lg border">
          <option value="">All</option>
          {tags.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-600">Sort</label>
        <select value={sort} onChange={(e)=>setSort(e.target.value)} className="p-3 rounded-lg border">
          <option value="popular">Popularity</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
}
