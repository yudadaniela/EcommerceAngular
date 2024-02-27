import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdmiComponent } from './admi.component';
import { ApiProductsService } from 'src/app/services/api-products.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
describe('AdmiComponent',()=>{
 let Component:AdmiComponent;
 let fixture:ComponentFixture<AdmiComponent>;
 let mockApiProductsService:jasmine.SpyObj<ApiProductsService>;
 let mockMatDialog:jasmine.SpyObj<MatDialog>
 beforeEach(async()=>{
   mockApiProductsService=jasmine.createSpyObj('ApiProductsService', ['getData', 'delete']);
   mockMatDialog=jasmine.createSpyObj('MatDialog',['open'])
   await TestBed.configureTestingModule({
    declarations:[AdmiComponent],
    providers:[
        {provide:ApiProductsService, useValue:mockApiProductsService},
        {provide:MatDialog, useValue:mockMatDialog}
    ],
    imports:[
        MatDialogModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatFormFieldModule
    ]
   }).compileComponents()
 })
 beforeEach(()=>{
    fixture=TestBed.createComponent(AdmiComponent);
    Component=fixture.componentInstance;
    fixture.detectChanges()
 })
 it('should create',()=>{
   expect(Component).toBeTruthy();
 });
 it('should load data on initialization',fakeAsync(()=>{
  const mockData=[{id:1, title:'product1', category:'category1', price:12.5}] 
  mockApiProductsService.getData.and.returnValue(of(mockData))
  Component.ngOnInit()
  tick() //proporcionada por el modulo de pruebas de angular utilizada en pruebas asincronas
  expect(mockApiProductsService.getData).toHaveBeenCalled()
  expect(Component.dataSource.data).toEqual(mockData)
 }))
 it('should open modal for adding new product', fakeAsync(()=>{
const mockDialogRef=jasmine.createSpyObj('MatDialogRef', ['afterClosed'])
mockDialogRef.open.and.returnValue(mockDialogRef)
Component.openModal()
expect(mockMatDialog.open).toHaveBeenCalled()
}))
})