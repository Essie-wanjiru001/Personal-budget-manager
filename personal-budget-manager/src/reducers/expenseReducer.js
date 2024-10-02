export const expenseReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_EXPENSE':
        return {
          ...state,
          expenses: [...state.expenses, action.payload],
        };
      case 'SET_FILTER_CATEGORY':
        return {
          ...state,
          filterCategory: action.payload,
        };
      case 'SET_FILTER_DATE':
        return {
          ...state,
          filterDate: action.payload,
        };
      default:
        return state;
    }
  };
  