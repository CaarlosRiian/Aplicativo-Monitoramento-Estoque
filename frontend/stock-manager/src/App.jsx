import React from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const App = () => {
  return (
    <div>
      <h1>Gerenciamento de Estoque</h1>
      <ItemForm />
      <ItemList />
    </div>
  );
};

export default App;
