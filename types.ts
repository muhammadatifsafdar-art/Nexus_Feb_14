
export type AuthView = 'sign_in' | 'sign_up' | 'forgot_password' | 'update_password';

export interface UserProfile {
  id: string;
  email?: string;
}

export interface AuthState {
  view: AuthView;
  isLoading: boolean;
  message: {
    type: 'success' | 'error';
    text: string;
  } | null;
}
