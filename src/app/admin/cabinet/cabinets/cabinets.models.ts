export class Cabinets {
  id: number;
  name: string;
  number: string;
  address: string;
  constructor(cabinets){
    this.id  = cabinets.id;
    this.name = cabinets.name;
    this.number = cabinets.number;
    this.address = cabinets.address;
  }
}

