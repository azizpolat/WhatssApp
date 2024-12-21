const converFullName = (name: string, surname: string) => {
  return `${name} ${surname}`;
};

const formatPhoneNumber = (phoneNumber: string | null | undefined) => {
  if (!phoneNumber) return '';
  return phoneNumber.replace(/\s/g, '');
};

export {converFullName, formatPhoneNumber};
