export interface AuthState {
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => void;
  logout: () => void;
}
