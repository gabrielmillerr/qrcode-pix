import { v4 as uuidv4 } from 'uuid';

export const getDefaultIdentifier = (): string =>
  uuidv4().replace(/-/g, '').slice(0, 25);