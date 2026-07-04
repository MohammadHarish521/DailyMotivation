import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { storage } from "../services/storage";

interface FavoritesContextValue {
  /** Favorited quote ids. */
  favoriteIds: string[];
  loading: boolean;
  isFavorite: (quoteId: string) => boolean;
  toggleFavorite: (quoteId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const hydrated = useRef(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const loaded = await storage.loadFavorites();
      if (!active) return;
      setFavoriteIds(loaded);
      hydrated.current = true;
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (hydrated.current) storage.saveFavorites(favoriteIds);
  }, [favoriteIds]);

  const isFavorite = useCallback(
    (quoteId: string) => favoriteIds.includes(quoteId),
    [favoriteIds],
  );

  const toggleFavorite = useCallback((quoteId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(quoteId)
        ? prev.filter((id) => id !== quoteId)
        : [...prev, quoteId],
    );
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({ favoriteIds, loading, isFavorite, toggleFavorite }),
    [favoriteIds, loading, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

/** Access favorited quotes. Must be used within a FavoritesProvider. */
export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
}
