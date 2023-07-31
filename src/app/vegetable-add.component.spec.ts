import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { VegetableAddComponent } from './controller/vegetableAddComponent';
import { VegetableService } from './controller/vegetableService';
import { Observable, of } from 'rxjs';
/**
 * Start a test suite for the VegetableAddComponent class

 */
describe('VegetableAddComponent', () => {
  let component: VegetableAddComponent;
  let fixture: ComponentFixture<VegetableAddComponent>;
  let mockVegetableService: { createVegetable: { and: { returnValue: (arg0: Observable<{}>) => void; }; }; };
  let mockRouter: { navigate: any; };

  beforeEach(async(() => {
    mockVegetableService = jasmine.createSpyObj(['createVegetable']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [VegetableAddComponent],
      providers: [
        { provide: VegetableService, useValue: mockVegetableService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VegetableAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /**
   *  Test case: should create the componen
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /**
   * Test case: should call createVegetable and navigate when form is valid
   */
  it('should call createVegetable and navigate when form is valid', () => {
    // Arrange
    mockVegetableService.createVegetable.and.returnValue(of({}));
    component.form.setValue({
      refDate: '',
      dguid: '',
      typeOfProduct: '',
      uom: '',
      uomId: '',
      scalarFactor: '',
      scalarId: '',
      vector: '',
      coordinate: '',
      value: '',
      status: '',
      symbol: '',
      terminated: '',
      decimals: ''
    });

    /// Act: Execute the function under tes
    component.onSubmitAdd();

    // Assert: Check that results are as expected
    expect(mockVegetableService.createVegetable).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/vegetables']);
  });
});
