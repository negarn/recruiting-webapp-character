import { useCallback, useEffect, useState } from "react";
import useData from "./useData";

import { showErrorMessage } from "../helper";

function useSkills(initialSkills, modifiers) {
  const { data, increaseValue, decreaseValue } = useData(initialSkills);

  const [allowedSkillPoints, setAllowedSkillPoints] = useState(0);
  const [usedSkillPoints, setUsedSkillPoints] = useState(0);

  useEffect(() => {
    setAllowedSkillPoints(Math.max(0, 10 + modifiers.Intelligence * 4));
  }, [modifiers.Intelligence, setAllowedSkillPoints]);

  const increaseSkill = useCallback(
    (skill) => {
      const newUsedSkillPoints = usedSkillPoints + 1;
      if (newUsedSkillPoints > allowedSkillPoints) {
        showErrorMessage(
          "You need more skill points! Upgrade intelligence to get more"
        );
        return;
      }
      increaseValue(skill);
      setUsedSkillPoints(newUsedSkillPoints);
    },
    [allowedSkillPoints, increaseValue, setUsedSkillPoints, usedSkillPoints]
  );

  const decreaseSkill = useCallback(
    (skill) => {
      decreaseValue(skill);
      setUsedSkillPoints(Math.max(0, usedSkillPoints - 1));
    },
    [decreaseValue, setUsedSkillPoints, usedSkillPoints]
  );

  return {
    skills: data,
    allowedSkillPoints,
    usedSkillPoints,
    increaseSkill,
    decreaseSkill,
  };
}

export default useSkills;
