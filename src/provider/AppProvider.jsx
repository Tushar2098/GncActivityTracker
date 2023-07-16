/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState } from 'react';
import { CATEGORY_MAP } from '../components/constant';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
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

  const contextValue = useMemo(() => {
    return { transformedData, onCheckboxClick, setUserMeta, userMeta };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [transformedData]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
