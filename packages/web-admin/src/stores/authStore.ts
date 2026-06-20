import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import customInstance from '@/api/custom-instance';

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
      login: async (email: string, password: string) => {
        const res = await customInstance.post('/auth/login', { email, password });
        const { access_token, user } = res.data;
        localStorage.setItem('auth_token', access_token);
        set({
          isAuthenticated: true,
          user: {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
          },
          token: access_token,
          adminKey: access_token,
        });
      },
      logout: () => {
        localStorage.removeItem('auth_token');
        set({ isAuthenticated: false, user: null, token: null, adminKey: null });
      },
    }),
    { name: 'telehealings-admin-auth' }
  )
);
