type AuthState = { isLoggedIn: boolean; token: string | null };

type AuthAction = { type: "LOGIN"; token: string } | { type: "LOGOUT" };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: action.token, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, token: null, isLoggedIn: false };
  }
}
