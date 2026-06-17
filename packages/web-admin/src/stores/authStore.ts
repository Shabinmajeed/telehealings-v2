import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string; name: string; role: string } | null;
  token: string | null;
  adminKey: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      adminKey: null,
      login: async (email: string, _password: string) => {
        set({
          isAuthenticated: true,
          user: { id: '1', email, name: 'Admin', role: 'admin' },
          token: 'mock-token',
          adminKey: 'dev-admin-key-2026',
        });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, token: null, adminKey: null });
      },
    }),
    { name: 'telehealings-admin-auth' }
  )
);
