export interface CreateDriverDTO {
  name: string;
  cpf: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface UpdateDriverDTO {
  name: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
