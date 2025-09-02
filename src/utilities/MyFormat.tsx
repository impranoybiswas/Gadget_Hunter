export const formattedDate = (): string => {
    const date = new Date();
    return date.toISOString();
  };