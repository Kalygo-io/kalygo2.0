export const initialState = {
  number: 0,
  user: null,
  authLoading: false,
  authRedirect: "",
  auth: false,
};

export type Action =
  | { type: "add_number"; payload: number }
  | {
      type: "init_stored";
      payload: {
        number: number;
        user: any;
        authInitializing: boolean;
      };
    }
  | {
      type: "set_auth";
      payload: {
        authLoading: boolean;
        authRedirect: string;
        auth: boolean;
      };
    };

export const AppReducer = (
  state: {
    number: number;
    user: any;
    authLoading: boolean;
  },
  action: Action
) => {
  switch (action.type) {
    case "init_stored": {
      return action.payload;
    }

    case "add_number": {
      return {
        ...state,
        number: action.payload + state.number,
      };
    }

    case "set_auth": {
      return {
        ...state,
        authLoading: action.payload.authLoading,
        authRedirect: action.payload.authRedirect,
        auth: action.payload.auth,
      };
    }
  }
};
