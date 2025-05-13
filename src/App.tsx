// import React from 'react'
import './App.css'
import './index.css'
import ErrorBoundary from './utils/ErrorBoundary'
// import Landing from './pages/Landing';
import store from './store/configStore.tsx'
import { Provider } from "react-redux";
import ReportRequestForm from './components/reportRequestForm.tsx';

function App() {

  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <ReportRequestForm />
        </ErrorBoundary>
      </Provider>


    </>
  )
}

export default App
