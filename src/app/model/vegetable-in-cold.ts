export class VegetablesInCold {
    public id: string;
    public refDate: string;
    public geo: string;
    public dguid: string;
    public typeOfProduct: string;
    public typeOfStorage: string;
    public uom: string;
    public uomId: string;
    public scalarFactor: string;
    public scalarId: string;
    public vector: string;
    public coordinate: string;
    public value: string;
    public status: string;
    public symbol: string;
    public terminated: string;
    public decimals: string;
  
    constructor() {
        this.id = "";
        this.refDate = "";
        this.geo = "";
        this.dguid = "";
        this.typeOfProduct = "";
        this.typeOfStorage = "";
        this.uom = "";
        this.uomId = "";
        this.scalarFactor = "";
        this.scalarId = "";
        this.vector = "";
        this.coordinate = "";
        this.value = "";
        this.status = "";
        this.symbol = "";
        this.terminated = "";
        this.decimals = "";
    }
    
    public get Id(): string {
       return this.id;
    }
    public set Id(value: string) {
      this.id = value;
    }
    public get RefDate(): string {
      return this.refDate;
    }
    public set RefDate(value: string) {
      this.refDate = value;
    }
    public get Geo(): string {
      return this.geo;
    }
    public set Geo(value: string) {
      this.geo = value;
    }
    public get Dguid(): string {
      return this.dguid;
    }
    public set Dguid(value: string) {
      this.dguid = value;
    }
  
    public get TypeOfProduct(): string {
      return this.typeOfProduct;
    }
    public set TypeOfProduct(value: string) {
      this.typeOfProduct= value;
    }
    
    public get TypeOfStorage(): string {
      return this.typeOfStorage;
    }
    public set TypeOfStorage(value: string) {
      this.typeOfStorage= value;
    }
    public get Uom(): string {
      return this.uom;
    }
    public set Uom(value: string) {
      this.uom = value;
    }
  
    public get UomId(): string {
      return this.uomId;
    }
    public set UomId(value: string) {
      this.uomId = value;
    }
  
    public get ScalarFactor(): string {
      return this.scalarFactor;
    }
    public set ScalarFactor(value: string) {
      this.scalarFactor = value;
    }
  
    public get ScalarId(): string {
      return this.scalarId;
    }
    public set ScalarId(value: string) {
      this.scalarId = value;
    }
  
    public get Vector(): string {
      return this.vector;
    }
    public set Vector(value: string) {
      this.vector = value;
    }
  
    public get Coordinate(): string {
      return this.coordinate;
    }
    public set Coordinate(value: string) {
      this.coordinate = value;
    }
  
    public get Value(): string {
      return this.value;
    }
    public set Value(value: string) {
      this.value = value;
    }
  
    public get Status(): string {
      return this.status;
    }
    public set Status(value: string) {
      this.status = value;
    }
  
    public get Symbol(): string {
      return this.symbol;
    }
    public set Symbol(value: string) {
      this.symbol = value;
    }
  
    public get Terminated(): string {
      return this.terminated;
    }
    public set Terminated(value: string) {
      this.terminated = value;
    }
  
    public get Decimals(): string {
      return this.decimals;
    }
    public set Decimals(value: string) {
      this.decimals = value;
    }
  }
  