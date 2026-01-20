export class Address {
  constructor(
    public readonly street: string,
    public readonly number: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string
  ) {
    if (!street || !city || !state || !zipCode) {
      throw new Error('Address invalid');
    }
  }
}
