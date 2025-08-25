"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ContentCard from "@/components/feed/ContentCard";

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.feed.favorites);

  if (favorites.length === 0) return <p>No favorites yet.</p>;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {favorites.map((favId) => (
        <ContentCard
          key={favId}
          id={favId}
          title={`Favorite Content ${favId}`}
          description="This is a placeholder for your saved favorite."
        />
      ))}
    </div>
  );
}
