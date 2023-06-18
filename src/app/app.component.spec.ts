import { VegetablesInCold } from "./model/vegetable-in-cold";
/**
 * Test unit with Karma to test the acessor from vegetableInCold class
 * by Frederico Lucio Macedo
 */
describe('VegetablesInCold', () => {
  let vegetablesInCold: VegetablesInCold;

  beforeEach(() => {
    vegetablesInCold = new VegetablesInCold();
  });
/**
 * Testing acessor set
 */
  it('should set and get RefDate', () => {
    const expectedValue = '2022-01-01';
    vegetablesInCold.RefDate = expectedValue;
    expect(vegetablesInCold.RefDate).toEqual(expectedValue);
  });
/**
 * Testing acesso get
 */
  it('should set and get Geo', () => {
    const expectedValue = 'Canada';
    vegetablesInCold.Geo = expectedValue;
    expect(vegetablesInCold.Geo).toEqual(expectedValue);
  });
/**
 * Testing acessor set
 */
  it('should set and get Dguid', () => {
    const expectedValue = '123';
    vegetablesInCold.Dguid = expectedValue;
    expect(vegetablesInCold.Dguid).toEqual(expectedValue);
  });
  /**
  * Testing acesso get
  */
  it('should set and get TypeOfProduct', () => {
    const expectedValue = 'Carrots';
    vegetablesInCold.TypeOfProduct = expectedValue;
    expect(vegetablesInCold.TypeOfProduct).toEqual(expectedValue);
  });
/**
 * Testing acessor set
 */
  it('should set and get TypeOfStorage', () => {
    const expectedValue = 'Cold';
    vegetablesInCold.TypeOfStorage = expectedValue;
    expect(vegetablesInCold.TypeOfStorage).toEqual(expectedValue);
  });
/**
  * Testing acesso get
  */
  it('should set and get Uom', () => {
    const expectedValue = 'kg';
    vegetablesInCold.Uom = expectedValue;
    expect(vegetablesInCold.Uom).toEqual(expectedValue);
  });
/**
  * Testing acesso get
  */
  it('should set and get UomId', () => {
    const expectedValue = '1';
    vegetablesInCold.UomId = expectedValue;
    expect(vegetablesInCold.UomId).toEqual(expectedValue);
  });
/**
 * Testing acessor set
 */
  it('should set and get ScalarFactor', () => {
    const expectedValue = '1';
    vegetablesInCold.ScalarFactor = expectedValue;
    expect(vegetablesInCold.ScalarFactor).toEqual(expectedValue);
  });
/**
  * Testing acesso get
  */
  it('should set and get ScalarId', () => {
    const expectedValue = '1';
    vegetablesInCold.ScalarId = expectedValue;
    expect(vegetablesInCold.ScalarId).toEqual(expectedValue);
  });
/**
 * Testing acessor set
 */
  it('should set and get Vector', () => {
    const expectedValue = '1';
    vegetablesInCold.Vector = expectedValue;
    expect(vegetablesInCold.Vector).toEqual(expectedValue);
  });
/**
  * Testing acesso get
  */
  it('should set and get Coordinate', () => {
    const expectedValue = '1';
    vegetablesInCold.Coordinate = expectedValue;
    expect(vegetablesInCold.Coordinate).toEqual(expectedValue);
  });
/**
 * Testing acessor set
 */
  it('should set and get Value', () => {
    const expectedValue = '100';
    vegetablesInCold.Value = expectedValue;
    expect(vegetablesInCold.Value).toEqual(expectedValue);
  });
/**
  * Testing acesso get
  */
  it('should set and get Status', () => {
    const expectedValue = 'Active';
    vegetablesInCold.Status = expectedValue;
    expect(vegetablesInCold.Status).toEqual(expectedValue);
  });
/**
 * Testing acessor set
 */
  it('should set and get Symbol', () => {
    const expectedValue = 'A';
    vegetablesInCold.Symbol = expectedValue;
    expect(vegetablesInCold.Symbol).toEqual(expectedValue);
  });
/**
  * Testing acesso get
  */
  it('should set and get Terminated', () => {
    const expectedValue = '-';
    vegetablesInCold.Terminated = expectedValue;
    expect(vegetablesInCold.Terminated).toEqual(expectedValue);
  });
/**
 * Testing acessor set
 */
  it('should set and get Decimals', () => {
    const expectedValue = '2';
    vegetablesInCold.Decimals = expectedValue;
    expect(vegetablesInCold.Decimals).toEqual(expectedValue);
  });
});
