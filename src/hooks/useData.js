import { useCallback, useState } from "react";
import { validValue } from "../helper";

function useData(initialData) {
  const [data, setData] = useState(initialData);

  const increaseValue = useCallback(
    (key) => {
      const newValue = data[key] + 1;
      setData({
        ...data,
        [key]: newValue,
      });
      return newValue;
    },
    [data]
  );

  const decreaseValue = useCallback(
    (key) => {
      const newValue = data[key] - 1;
      if (!validValue(newValue)) {
        return data[key];
      }
      setData({
        ...data,
        [key]: newValue,
      });
      return newValue;
    },
    [data]
  );

  return {
    data,
    increaseValue,
    decreaseValue,
  };
}

export default useData;
