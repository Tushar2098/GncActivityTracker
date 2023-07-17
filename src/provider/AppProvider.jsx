/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    const fetchChartData = async () => {
      const result = await fetch(
        'https://ymht-6c9f4-default-rtdb.asia-southeast1.firebasedatabase.app/ymht1.json'
      );

      const response = await result.json();
      // when database doesn't exist
      if (response) {
        setUserMeta(response);
      }
    };
    fetchChartData();
  }, []);

  useEffect(() => {
    const pushToFirebase = async () => {
      const result = await fetch(
        'https://ymht-6c9f4-default-rtdb.asia-southeast1.firebasedatabase.app/ymht1.json',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userMeta),
        }
      );
      const response = await result.json();
    };

    pushToFirebase();
  }, [userMeta]);
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

  const contextValue = useMemo(() => {
    return { onCheckboxClick, setUserMeta, userMeta };
  }, [userMeta]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
