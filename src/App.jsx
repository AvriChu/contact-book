import './App.css';
import CreateContactBur from './components/CreateContactBur';
import EditContactBur from './components/EditContactBur';
import RestorePage from './components/RestorePage';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreateContactBur />} />
        <Route path='/edit/:letter/:index' element={<EditContactBur />} />
        <Route path='/restore' element={<RestorePage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
