import { VegetablesInCold } from '../app/model/vegetable-in-cold';
import * as csvParser from 'csv-parser';
import * as csvWriter from 'csv-writer';

export class DataAccess {
  private csvFilePath: string = 'src/assets/data-source/data-source.csv';

  public readCSV(): Promise<VegetablesInCold[]> {
    return new Promise((resolve, reject) => {
      const vegetablesList: VegetablesInCold[] = [];

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.csv';

      fileInput.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const file = target.files[0];
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
            const csvData = e.target?.result as string;
            const parser = csvParser();

            parser
              .on('data', (data: any) => {
                const vegetable: VegetablesInCold = new VegetablesInCold();
                vegetable.RefDate = data.REF_DATE;
                vegetable.Geo = data.GEO;
                vegetable.Dguid = data.DGUID;
                vegetable.TypeOfProduct = data.TYPE_OF_PRODUCT;
                vegetable.TypeOfStorage = data.TYPE_OF_STORAGE;
                vegetable.Uom = data.UOM;
                vegetable.UomId = data.UOM_ID;
                vegetable.ScalarFactor = data.SCALAR_FACTOR;
                vegetable.ScalarId = data.SCALAR_ID;
                vegetable.Vector = data.VECTOR;
                vegetable.Coordinate = data.COORDINATE;
                vegetable.Value = data.VALUE;
                vegetable.Status = data.STATUS;
                vegetable.Symbol = data.SYMBOL;
                vegetable.Terminated = data.TERMINATED;
                vegetable.Decimals = data.DECIMALS;
                vegetablesList.push(vegetable);
              })
              .on('end', () => {
                resolve(vegetablesList);
              })
              .on('error', (error: any) => {
                reject(error);
              });

            parser.write(csvData);
            parser.end();
          };

          reader.readAsText(file);
        } else {
          reject(new Error('No file selected'));
        }
      });

      fileInput.click();
    });
  }
  public addRow(vegetable: VegetablesInCold): Promise<void> {
    return new Promise((resolve, reject) => {
      const writer = csvWriter.createObjectCsvWriter({
        path: this.csvFilePath,
        header: [
          { id: 'REF_DATE', title: 'RefDate' },
          { id: 'GEO', title: 'Geo' },
          { id: 'DGUID', title: 'Dguid' },
          { id: 'TYPE_OF_PRODUCT', title: 'TypeOfProduct' },
          { id: 'TYPE_OF_STORAGE', title: 'TypeOfStorage' },
          { id: 'UOM', title: 'Uom' },
          { id: 'UOM_ID', title: 'UomId' },
          { id: 'SCALAR_FACTOR', title: 'ScalarFactor' },
          { id: 'SCALAR_ID', title: 'ScalarId' },
          { id: 'VECTOR', title: 'Vector' },
          { id: 'COORDINATE', title: 'Coordinate' },
          { id: 'VALUE', title: 'Value' },
          { id: 'STATUS', title: 'Status' },
          { id: 'SYMBOL', title: 'Symbol' },
          { id: 'TERMINATED', title: 'Terminated' },
          { id: 'DECIMALS', title: 'Decimals' },
        ],
        append: true,
      });

      const data = [
        {
          REF_DATE: vegetable.RefDate,
          GEO: vegetable.Geo,
          DGUID: vegetable.Dguid,
          TYPE_OF_PRODUCT: vegetable.TypeOfProduct,
          TYPE_OF_STORAGE: vegetable.TypeOfStorage,
          UOM: vegetable.Uom,
          UOM_ID: vegetable.UomId,
          SCALAR_FACTOR: vegetable.ScalarFactor,
          SCALAR_ID: vegetable.ScalarId,
          VECTOR: vegetable.Vector,
          COORDINATE: vegetable.Coordinate,
          VALUE: vegetable.Value,
          STATUS: vegetable.Status,
          SYMBOL: vegetable.Symbol,
          TERMINATED: vegetable.Terminated,
          DECIMALS: vegetable.Decimals,
        },
      ];

      writer
        .writeRecords(data)
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  // Rest of the code for addRow, deleteRow, and updateRow methods
}
