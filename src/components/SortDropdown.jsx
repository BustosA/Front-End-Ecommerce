import React from 'react';
import "./SortDropdown.css";

const SortDropdown = ({ onChangeSortOrder, currentSortOrder }) => {
  return (
    <select onChange={e => onChangeSortOrder(e.target.value)} value={currentSortOrder}>
      <option value="default" disabled>Ordenar por...</option>
      <option value="menorAMayor">Precio: Menor a Mayor</option>
      <option value="mayorAMenor">Precio: Mayor a Menor</option>
    </select>
  );
};

export default SortDropdown;