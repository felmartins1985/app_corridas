export class Receipt {
  constructor(
    public readonly raceId: string,
    public readonly passengerId: string,
    public readonly driverId: string,
    public readonly date: Date,
    public readonly price: number,
    public readonly distanceMeters: number,
  ) {}

  toJSON(): string {
    return JSON.stringify(
      {
        raceId: this.raceId,
        passengerId: this.passengerId,
        driverId: this.driverId,
        date: this.date.toISOString(),
        price: this.price,
        distanceMeters: this.distanceMeters,
      },
      null,
      2,
    );
  }
}
