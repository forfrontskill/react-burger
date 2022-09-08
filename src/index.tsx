import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Content from './components/content/content';

ReactDOM.render(
  <React.StrictMode>
    <AppHeader />
    <Content>
      <BurgerIngredients />
      <BurgerConstructor />
    </Content>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
