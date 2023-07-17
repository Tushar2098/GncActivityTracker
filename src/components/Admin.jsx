import { Link } from 'react-router-dom';
import { useAppContext } from '../provider/AppProvider';
import Table from './Table';
import { CATEGORY_MAP } from './constant';

export function Admin() {
  const { onCheckboxClick } = useAppContext();
  const columns = ['Name'].concat(Object.keys(CATEGORY_MAP));

  return (
    <>
      <Link to='/'>Go Home</Link>
      <Table onCheckboxClick={onCheckboxClick} columns={columns} />
    </>
  );
}
