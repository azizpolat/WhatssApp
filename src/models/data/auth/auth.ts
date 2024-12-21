interface Country {
  id: number;
  code: string;
  country: string;
}

interface CountriesType {
  name: string;
  surname: string;
  countries: Country[];
  selectCountry: object;
  pendingCountriesCode: boolean;
  phoneNumber: string;
}

export type {CountriesType};
