
export interface Service {
  active: boolean;
  isChild: boolean;
  additional: any[];
  name: string;
  image: string;
  site: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  desc: string;
  image: string;
  services: Service[];
  createdAt: Date;
  updatedAt: Date;
}
