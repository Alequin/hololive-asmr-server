import { isNil } from "lodash";

export const removeNilValuesFromObject = (object) => {
  const clonedObject = { ...object };
  for (const key in clonedObject) if (isNil(clonedObject[key])) delete clonedObject[key];
  return clonedObject;
};
