import { isNil, pickBy } from "lodash";

export const removeNilValuesFromObject = (object) => pickBy(object, (value) => !isNil(value));
