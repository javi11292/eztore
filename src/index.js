import { useCallback, useEffect, useState } from 'react';

function addCallbacks(callbacks, key) {
  return { ...callbacks, [key]: new Set() };
}

export function getStore(values) {
  function get(key) {
    return values[key].state;
  }

  function set(key, { type = 'default', payload }) {
    const field = values[key];
    const { state, reducers } = field;

    field.state = reducers[type](state, payload);

    if (state !== field.state) {
      callbacks[key].forEach((callback) => callback(field.state));
    }
  }

  function addCallback(key, callback) {
    callbacks[key].add(callback);
  }

  function deleteCallback(key, callback) {
    callbacks[key].delete(callback);
  }

  function useStore(key, subscribe = true) {
    const [state, setState] = useState(get(key));

    const dispatch = useCallback((action) => set(key, action), [key]);

    useEffect(() => {
      if (!subscribe) return;
      addCallback(key, setState);
      return () => deleteCallback(key, setState);
    }, [key, subscribe]);

    return subscribe ? [state, dispatch] : dispatch;
  }

  const callbacks = Object.keys(values).reduce(addCallbacks, {});

  return useStore;
}
