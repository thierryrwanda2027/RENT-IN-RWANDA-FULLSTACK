"use client";

import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { toggleFavorite, getIsFavorite } from "@/actions/favorites";
import { useSession } from "next-auth/react";

interface FavoriteButtonProps {
  listingId: number;
}

export default function FavoriteButton({ listingId }: FavoriteButtonProps) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (session) {
      getIsFavorite(listingId).then(setIsFavorite);
    }
  }, [listingId, session]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      alert("Please login to save favorites");
      return;
    }

    if (isPending) return;

    // Optimistic update
    setIsFavorite(!isFavorite);
    setIsPending(true);

    const result = await toggleFavorite(listingId);
    
    if (!result.success) {
      // Rollback
      setIsFavorite(isFavorite);
      alert(result.error);
    }
    
    setIsPending(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`p-1 hover:scale-110 active:scale-95 transition ${isPending ? 'opacity-70' : ''}`}
    >
      <FaHeart
        size={24}
        className="transition-colors duration-300"
        color={isFavorite ? "#ff385c" : "rgba(0,0,0,0.5)"}
        style={{ stroke: 'white', strokeWidth: '10px' }}
      />
    </button>
  );
}
