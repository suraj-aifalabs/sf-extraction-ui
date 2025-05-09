import React from 'react'
import './App.css'
import './index.css'
import ErrorBoundary from './utils/ErrorBoundary'
import Landing from './pages/Landing';
import store from './store/configStore.tsx'
import { Provider } from "react-redux";

function App() {

  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <Landing />
        </ErrorBoundary>
      </Provider>


    </>
  )
}

export default App
