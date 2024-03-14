import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

const App: React.FC = () => {
  return (
    <div className="page">
      <Container>
        <Header />
      </Container>

      <Notification />

      <div className="page__content">
        <Outlet />
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
