import { useState } from 'react';
import './App.css';
import StackedBarChart from './components/StackedBarChart';
import Table from './components/Table';
import { CATEGORY_MAP } from './components/constant';

function App() {
  const [userMeta, setUserMeta] = useState({});

  const updateList = (list = [], name, isAdd, category) => {
    let newList;
    const idx = list.findIndex((item) => item.name === name);
    if (idx === -1) {
      newList = [{ name, value: CATEGORY_MAP[category] }, ...list];
    } else {
      newList = list.toSpliced(idx, 1, {
        name,
        value: isAdd
          ? list[idx].value + CATEGORY_MAP[category]
          : list[idx].value - CATEGORY_MAP[category],
      });
    }
    return newList;
  };

  const columns = ['Name'].concat(Object.keys(CATEGORY_MAP));
  const onCheckboxClick = (ymhtName, category, isAdd) => {
    setUserMeta((oldMeta) => {
      return {
        ...oldMeta,
        [category]: {
          ...oldMeta[category],
          data: updateList(oldMeta[category]?.data, ymhtName, isAdd, category),
        },
      };
    });
  };

  const transformedData = Object.entries(userMeta).map(([category, value]) => {
    return { label: category, data: value.data };
  });

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
      <StackedBarChart data={transformedData} />
      <Table onCheckboxClick={onCheckboxClick} columns={columns} />
    </>
  );
}

export default App;
