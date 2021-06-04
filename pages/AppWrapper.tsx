import { createContext, useContext } from 'react';

export interface AppGlobalState {
  selected_supplier: string;
  back_url: string;
}
const defaultState: AppGlobalState = {
  selected_supplier: '',
  back_url: ''
};

const AppContext = createContext({
  selected_supplier: '',
  back_url: ''
});

export function AppWrapper({children}: {children: any}) {
  let sharedState: AppGlobalState = defaultState;

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
