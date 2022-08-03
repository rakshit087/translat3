export const fileHandeler = {
  convertToArray: (fileContent: string) => {
    return fileContent.split(/\r?\n|\r/g);
  },
};
