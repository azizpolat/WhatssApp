interface Route {
  name: string;
}

interface TabIconProps {
  focused?: boolean; // soru işareti prps zorunlıu olamdıgını belirtmek için
  color?: string;
  size?: number;
  route?: Route;
}

export type {TabIconProps};
