import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [watchlistIds, setWatchlistIds] = useState([]);

  const loadWatchlist = useCallback(async (t) => {
    const { movies } = await api("/watchlist", { token: t });
    setWatchlistIds(movies.map((m) => m._id));
  }, []);

  // Restore session on page load
  useEffect(() => {
    if (!token) return;
    api("/auth/me", { token })
      .then(({ user }) => {
        setUser(user);
        return loadWatchlist(token);
      })
      .catch(() => logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const saveSession = (data) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const login = async (email, password) =>
    saveSession(await api("/auth/login", { method: "POST", body: { email, password } }));

  const register = async (name, email, password) =>
    saveSession(await api("/auth/register", { method: "POST", body: { name, email, password } }));

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setWatchlistIds([]);
  }

  const toggleWatchlist = async (movieId) => {
    if (!token) return false;
    const has = watchlistIds.includes(movieId);
    await api(`/watchlist/${movieId}`, { method: has ? "DELETE" : "POST", token });
    setWatchlistIds((ids) => (has ? ids.filter((i) => i !== movieId) : [...ids, movieId]));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, watchlistIds, toggleWatchlist }}>
      {children}
    </AuthContext.Provider>
  );
}
