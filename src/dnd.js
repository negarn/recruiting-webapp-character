import { useCallback, useState } from "react";
import {
  ATTRIBUTE_LIST,
  CLASS_LIST,
  SKILL_LIST,
  initialAttributeValue,
  initialSkillValue,
} from "./consts";
import { getModifier } from "./helper";
import useAttributes from "./hooks/useAttributes";
import useSkills from "./hooks/useSkills";

function Dnd() {
  // modifiers: { Strength: 0, ... }
  const [modifiers, setModifiers] = useState(
    ATTRIBUTE_LIST.reduce(
      (accumulator, attribute) => ({
        ...accumulator,
        [attribute]: getModifier(initialAttributeValue),
      }),
      {}
    )
  );

  // attributes: { Strength: 10, ... }
  const { attributes, increaseAttribute, decreaseAttribute } = useAttributes(
    ATTRIBUTE_LIST.reduce(
      (accumulator, attribute) => ({
        ...accumulator,
        [attribute]: initialAttributeValue,
      }),
      {}
    ),
    modifiers,
    setModifiers
  );

  // skills: { Acrobatics: 0, ... }
  const {
    skills,
    allowedSkillPoints,
    usedSkillPoints,
    increaseSkill,
    decreaseSkill,
  } = useSkills(
    SKILL_LIST.reduce(
      (accumulator, skill) => ({
        ...accumulator,
        [skill.name]: initialSkillValue,
      }),
      {}
    ),
    modifiers
  );

  const [displayRequirements, setDisplayRequirements] = useState(null);

  const hideRequirements = useCallback(() => {
    setDisplayRequirements(null);
  }, []);

  const meetsClassRequirements = useCallback(
    (roleClass) => {
      const doesNotMeetRequirement = Object.keys(CLASS_LIST[roleClass]).find(
        (attribute) => attributes[attribute] < CLASS_LIST[roleClass][attribute]
      );
      return !doesNotMeetRequirement;
    },
    [attributes]
  );

  return (
    <div className="flex row pt-1">
      <div className="border border-radius-1 pa-1 ml-1">
        <h2>Attributes</h2>
        {Object.keys(attributes).map((attribute) => (
          <div key={attribute}>
            {attribute}: {attributes[attribute]} (Modifier:{" "}
            {modifiers[attribute]})
            <button
              onClick={() => increaseAttribute(attribute)}
              className="ml-1"
            >
              +
            </button>
            <button onClick={() => decreaseAttribute(attribute)}>-</button>
          </div>
        ))}
      </div>
      <div className="border border-radius-1 pa-1 ml-1">
        <h2>Classes</h2>
        {Object.keys(CLASS_LIST).map((roleClass) => (
          <div
            key={roleClass}
            className={`${
              meetsClassRequirements(roleClass) && "red"
            } cursor-pointer`}
            onClick={() => setDisplayRequirements(roleClass)}
          >
            {roleClass}
          </div>
        ))}
      </div>
      {displayRequirements && (
        <div className="border border-radius-1 pa-1 ml-1">
          <h2>{displayRequirements} Minimum Requirements</h2>
          {Object.keys(CLASS_LIST[displayRequirements]).map((attribute) => (
            <div key={attribute}>
              {attribute}: {CLASS_LIST[displayRequirements][attribute]}
            </div>
          ))}
          <button onClick={hideRequirements} className="mt-1">
            Close Requirement View
          </button>
        </div>
      )}
      <div className="border border-radius-1 pa-1 ml-1">
        <h2>Skills</h2>
        <h3>
          Total skill points (used/total): {usedSkillPoints}/
          {allowedSkillPoints}
        </h3>
        {SKILL_LIST.map((skill) => (
          <div key={skill.name}>
            {skill.name}: {skills[skill.name]}
            (Modifier: {skill.attributeModifier}):&nbsp;
            {modifiers[skill.attributeModifier]}
            <button onClick={() => increaseSkill(skill.name)} className="ml-1">
              +
            </button>
            <button onClick={() => decreaseSkill(skill.name)} className="mr-1">
              -
            </button>
            total:&nbsp;
            {skills[skill.name] + modifiers[skill.attributeModifier]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dnd;
