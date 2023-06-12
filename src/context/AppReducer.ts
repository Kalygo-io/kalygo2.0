export const initialState = {
  authLoading: false,
  authRedirect: "",
  auth: false,
  summaryId: "",
};

export type Action =
  | {
      type: "init_stored";
      payload: {
        auth: boolean;
        authLoading: boolean;
        authRedirect: string;
        summaryId: string;
      };
    }
  | {
      type: "set_auth";
      payload: {
        authLoading: boolean;
        authRedirect: string;
        auth: boolean;
      };
    }
  | {
      type: "set_summary";
      payload: {
        summaryId: string;
      };
    };

export const AppReducer = (
  state: {
    auth: boolean;
    authLoading: boolean;
    authRedirect: string;
    summaryId: string;
  },
  action: Action
) => {
  switch (action.type) {
    case "init_stored": {
      return action.payload;
    }

    case "set_auth": {
      return {
        ...state,
        authLoading: action.payload.authLoading,
        authRedirect: action.payload.authRedirect,
        auth: action.payload.auth,
      };
    }

    case "set_summary": {
      return {
        ...state,
        summaryId: action.payload.summaryId,
      };
    }
  }
};
