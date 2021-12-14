import React, {useEffect, useRef} from 'react';
import {createContext, useState} from 'react';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../storages/logsStorage';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const initialLogsRef = useRef(null);
  const [logs, setLogs] = useState([]);

  const onCreate = ({subtitle, comment, date, now, done, selected , group}) => {
    const log = {
      id: uuidv4(),
      subtitle,
      comment,
      date,
      now,
      done,
      selected,
      group,
    };
    setLogs([log, ...logs]);
  };

  const onModify = modified => {
    // logs 배열을 순회해 id가 일치하면 log를 교체하고 그렇지 않으면 유지
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  };

  const onRemove = id => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  };

  const onToggle = id => {
    const nextLogs = logs.map(log => (log.id === id ? {...log, done: !log.done} : log));
    setLogs(nextLogs);
  }

  const onSelect = id => {
    const nextLogs = logs.map(log => (log.id === id ? {...log, selected: !log.selected} : log));
    setLogs(nextLogs);
  }

  const onMultipleDelete = () => {
    const nextLogs = logs.filter(log => log.selected !== true);
    setLogs(nextLogs);
  }
  useEffect(() => {
    // useEffect 내에서 async 함수를 만들고 바로 호출
    // IIFE 패턴
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove, onToggle, onSelect, onMultipleDelete}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;