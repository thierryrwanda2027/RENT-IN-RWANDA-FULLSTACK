"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface FavoriteButtonProps {
  listingId: number;
}

export default function FavoriteButton({ listingId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      onClick={() => setIsFavorite(!isFavorite)}
      className="p-1 hover:scale-110 active:scale-95 transition"
    >
      <FaHeart
        size={24}
        color={isFavorite ? "#ff385c" : "rgba(0,0,0,0.5)"}
        style={{ stroke: 'white', strokeWidth: '10px' }}
      />
    </button>
  );
}
