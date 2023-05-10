export const initialState = {
  number: 0,
};

export type Action =
  | { type: "add_number"; payload: number }
  | { type: "init_stored"; payload: typeof initialState };

export const AppReducer = (
  state: {
    number: number;
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
  }
};
