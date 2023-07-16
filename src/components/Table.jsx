import { NAMES } from './constant';
/* eslint-disable react/prop-types */
const Row = ({ name, onCheckboxClick, columns }) => {
  return (
    <>
      {columns.map((column, idx) => {
        if (column === 'Name') {
          return <span key={idx}>{name}</span>;
        } else {
          return (
            <input
              key={idx}
              type='checkbox'
              name={column.replace(' ', '_')}
              onChange={({ target }) => onCheckboxClick(name, target.name, target.checked)}
            />
          );
        }
      })}
    </>
  );
};

export default function Table({ onCheckboxClick, columns }) {
  return (
    <section className="table">
      <hr />
      <h1>Dashboard</h1>
      <div className='table-grid'>
        {columns.map((column, idx) => {
          return <h3 key={idx}>{column}</h3>;
        })}
        {NAMES.map((name) => {
          return (
            <Row
              name={name}
              key={name.replace(' ', '_')}
              onCheckboxClick={onCheckboxClick}
              columns={columns}
            ></Row>
          );
        })}
      </div>
    </section>
  );
}
