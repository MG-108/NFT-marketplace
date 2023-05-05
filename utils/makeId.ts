/* eslint-disable no-plusplus */

// hard coded: create a unique blockchain adress
export const makeId = (length: number): string => {
  let result = '';

  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
