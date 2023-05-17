"use client";

import InputCategorizer from "./InputCategorizer";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import PlusIcon from "./PlusIcon";

const InputCategorizerManager = ({ inputFieldClassName }) => {
  const [categorizers, setCategorizers] = useState([]);

  const addCategorizer = () => {
    const id = uuidv4();  // Using uuid for unique id
    setCategorizers(prevCategorizers => [...prevCategorizers, id]);
  };

  const deleteCategorizer = (id) => {
    setCategorizers(prevCategorizers => prevCategorizers.filter(c => c !== id));
  };

  return (
    <div>
      {categorizers.map(id => (
        <InputCategorizer key={id} id={id} onDelete={deleteCategorizer} className={inputFieldClassName} />
      ))}
      <button onClick={addCategorizer}><PlusIcon /></button>
    </div>
  );
};

export default InputCategorizerManager;
