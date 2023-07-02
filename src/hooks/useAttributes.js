import { useCallback } from "react";
import useData from "./useData";
import { getModifier } from "../helper";

function useAttributes(initialAttributes, modifiers, setModifiers) {
  const { data, increaseValue, decreaseValue } = useData(initialAttributes);

  const updateModifiers = useCallback(
    (attribute, newValue) => {
      const modifier = getModifier(newValue);
      if (modifier !== modifiers[attribute]) {
        setModifiers({
          ...modifiers,
          [attribute]: modifier,
        });
      }
    },
    [modifiers, setModifiers]
  );

  const increaseAttribute = useCallback(
    (attribute) => {
      const newValue = increaseValue(attribute);
      updateModifiers(attribute, newValue);
    },
    [increaseValue, updateModifiers]
  );

  const decreaseAttribute = useCallback(
    (attribute) => {
      const newValue = decreaseValue(attribute);
      updateModifiers(attribute, newValue);
    },
    [decreaseValue, updateModifiers]
  );

  return {
    attributes: data,
    increaseAttribute,
    decreaseAttribute,
  };
}

export default useAttributes;
