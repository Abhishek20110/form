import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ContactForm from './ContactForm'
import ListForm from './ListForm'
import EditForm from './EditForm'
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/list" element={<ListForm />} />
        <Route path="/edit/:id" element={<EditForm />} />
     
      </Routes>
    </Router>
  );
}

export default App
