import { Link } from 'react-router-dom';
import { useAppContext } from '../provider/AppProvider';
import Table from './Table';
import { CATEGORY_MAP } from './constant';

export function Admin() {
  const { onCheckboxClick, setUserMeta, userMeta } = useAppContext();
  const columns = ['Name'].concat(Object.keys(CATEGORY_MAP));

  const handleExportClick = () => {
    // Convert state data to JSON format
    const jsonData = JSON.stringify(userMeta);

    // Create a blob with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Generate a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'state_data.json';

    // Simulate a click on the download link to start the download
    downloadLink.click();
  };

  const handleImportChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      setUserMeta(importedData);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div className='actions mb-20'>
        <button onClick={handleExportClick}>Export Data</button>
        <div className='formControl'>
          <label htmlFor='fileImport'>Import Data</label>
          <input type='file' onChange={handleImportChange} id='fileImport' />
        </div>
      </div>
      <Link to='/'>Go Home</Link>
      <Table onCheckboxClick={onCheckboxClick} columns={columns} />
    </>
  );
}
