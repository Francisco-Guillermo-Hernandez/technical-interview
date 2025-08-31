'use client'

import { Component, useEffect, useState } from 'react';
import { LocalStorageUtils } from '@/hooks/localStorage';
import { verifyToken, type TokenPayload } from '@/lib/jwt';

import { useRouter } from 'next/navigation';


// Define the authentication context type
interface AuthContextType {
  token: string;
  user: TokenPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
}

//  Hook for authentication
export function useAuth(requiredRole?: string): AuthContextType {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from localStorage
        const token = LocalStorageUtils.getItem<string>('token');
        
        if (!token) {
          setError('No authentication token found');
          setIsLoading(false);
          return;
        }

        // Verify the token
        const payload = await verifyToken(token);

        // Use the token to send it into the requests
        setToken(token);
        
        // Check if token is valid (not expired)
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
          setError('Token has expired');
          LocalStorageUtils.removeItem('token'); 
          setIsLoading(false);
          return;
        }

        // Check if user is active
        if (!payload.isActive) {
          setError('User account is not active');
          LocalStorageUtils.removeItem('token');
          setIsLoading(false);
          return;
        }

        // Check required role if specified
        if (requiredRole && payload.role !== requiredRole) {
          setError(`Insufficient permissions. Required role: ${requiredRole}`);
          setIsLoading(false);
          return;
        }

        // Authentication successful
        setUser(payload);
        setIsAuthenticated(true);
        setError(null);

      } catch (err) {
        console.error('Authentication error:', err);
        setError('Invalid authentication token');
        LocalStorageUtils.removeItem('token'); // Remove invalid token
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole]);

  const logout = () => {
    LocalStorageUtils.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    // Redirect to login page or home
    router.push('/login');
  };

  return {
    token,
    user,
    isAuthenticated,
    isLoading,
    error,
    logout
  };
}


// Simple hook for checking authentication status only (no role check)
export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = LocalStorageUtils.getItem<string>('token');
    
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Simple check without full verification
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (payload.exp && payload.exp < currentTime) {
        LocalStorageUtils.removeItem('token');
        setIsLoading(false);
        return;
      }
      
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Token parsing error:', err);
      LocalStorageUtils.removeItem('token');
    }
    
    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
}

// Hook specifically for role-based access control
export function useRole(requiredRole: string) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const token = LocalStorageUtils.getItem<string>('token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }

        const payload = await verifyToken(token);
        setHasPermission(payload.role === requiredRole);
      } catch (err) {
        console.error('Role check error:', err);
        setHasPermission(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkRole();
  }, [requiredRole]);

  return { hasPermission, isLoading };
}
