import { createContext, useState, useEffect, useCallback } from "react";
import authService from "../Service/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      setError(null);
      return { success: true, user };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      setError(null);
      return { success: true, user };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const forgotPassword = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.forgotPassword({ email });
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to send reset email.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword({ token, password });
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to reset password.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.updateProfile(data);
      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.changePassword(data);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to change password.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
