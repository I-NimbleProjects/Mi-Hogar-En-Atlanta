import { HttpClient } from '@angular/common/http';
import { Injectable, Input, Output } from '@angular/core';
import { Property } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class FmlsService {
  @Input()
  // @Output() ciudades = [];

  public propertyN: any;
  public dataArray = [];
  public arrayCleanData = [];
  constructor(public httpClient: HttpClient,
              public appservice: AppService,){}


  getDataProperties(){
    return this.httpClient.get<any>('https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21')
  }

  cleanData(data: any){
    data.forEach(property => {
      this.dataArray ['id'] = property['ListingId'];
      this.dataArray ['title'] = property['BuildingName'];
      this.dataArray ['PropertyType'] = property['PropertyType'];
      this.dataArray ['PropertyStatus'] = property['MlsStatus'];
      this.dataArray ['city'] = property['City'];
      this.dataArray ['Zipcode'] = property['PostalCode'];
      this.dataArray ['Neighborhood'] = property['CityRegion'];
      this.dataArray ['street'] = property['StreetName'];
      this.dataArray ['location'] = property['Coordinates'];
      this.dataArray ['address'] = property['UnparsedAddress'];
      this.dataArray ['features'] = property['ExteriorFeatures'];
      this.dataArray ['price'] = property['ListPrice'];
      this.dataArray ['rent'] = property['RentIncludes'];
      this.dataArray ['bedrooms'] = property['BedroomsTotal'];
      this.dataArray ['bathrooms'] = property['BathroomsTotalInteger'];
      this.dataArray ['garages'] = property['GarageSpaces'];
      this.dataArray ['area'] = [property['LotSizeSquareFeet']];
      this.dataArray ['yearBuilt'] = property['YearBuilt'];
      this.dataArray ['addFeatures'] = property['CommunityFeatures'];
      this.dataArray ['gallery'] = [property['Media']];
      this.dataArray ['published'] = property['OnMarketDate'];

      this.propertyN = new Property (this.dataArray['id'], 
                                    this.dataArray ['title'], '',
                                    this.dataArray ['PropertyType'], 
                                    this.dataArray ['PropertyStatus'], 
                                    this.dataArray ['city'], 
                                    this.dataArray ['Zipcode'], 
                                    this.dataArray ['Neighborhood'], 
                                    this.dataArray ['street'], 
                                    this.dataArray ['location'], 
                                    this.dataArray ['address'], 
                                    this.dataArray ['features'], 
                                    true, 
                                    {'sale':this.dataArray ['price']}, 
                                    {'sale':this.dataArray ['price']}, 
                                    this.dataArray ['bedrooms'], 
                                    this.dataArray ['bathrooms'], 
                                    this.dataArray ['garages'],
                                    {'value': this.dataArray ['area'], 'id': 0, 'unit': "ft²"}, 
                                    this.dataArray ['yearBuilt'], 0, 0, 
                                    [{'id': this.dataArray ['id'], 'name': '', 'value': this.dataArray ['addFeatures']}], 
                                    [{'big':this.dataArray ['gallery'][0][0].MediaURLL,'medium':this.dataArray ['gallery'][0][0].MediaURL, 'small':this.dataArray ['gallery'][0][0].MediaURL,'id':0}], 
                                    [], [], 
                                    this.dataArray ['published'], '', 0)

      this.arrayCleanData.push(this.propertyN);
    });
  }
  getListingKey(id){
    return this.httpClient.get<any>('https://api.bridgedataoutput.com/api/v2/OData/test/Property('+ id + ')?access_token=6baca547742c6f96a6ff71b138424f21')
  }

  singleFmlsData(data: any){
    this.dataArray ['id'] = data['ListingId'];
    this.dataArray ['title'] = data['BuildingName'];
    this.dataArray ['PropertyType'] = data['PropertyType'];
    this.dataArray ['PropertyStatus'] = data['MlsStatus'];
    this.dataArray ['city'] = data['City'];
    this.dataArray ['Zipcode'] = data['PostalCode'];
    this.dataArray ['Neighborhood'] = data['CityRegion'];
    this.dataArray ['street'] = data['StreetName'];
    this.dataArray ['location'] = data['Coordinates'];
    this.dataArray ['address'] = data['UnparsedAddress'];
    this.dataArray ['features'] = data['ExteriorFeatures'];
    this.dataArray ['price'] = data['ListPrice'];
    this.dataArray ['rent'] = data['RentIncludes'];
    this.dataArray ['bedrooms'] = data['BedroomsTotal'];
    this.dataArray ['bathrooms'] = data['BathroomsTotalInteger'];
    this.dataArray ['garages'] = data['GarageSpaces'];
    this.dataArray ['area'] = [data['LotSizeSquareFeet']];
    this.dataArray ['yearBuilt'] = data['YearBuilt'];
    this.dataArray ['addFeatures'] = data['CommunityFeatures'];
    this.dataArray ['gallery'] = [data['Media']];
    this.dataArray ['published'] = data['OnMarketDate'];

    this.propertyN = new Property (this.dataArray['id'], 
                                    this.dataArray ['title'], '',
                                    this.dataArray ['PropertyType'], 
                                    this.dataArray ['PropertyStatus'], 
                                    this.dataArray ['city'], 
                                    this.dataArray ['Zipcode'], 
                                    this.dataArray ['Neighborhood'], 
                                    this.dataArray ['street'], 
                                    this.dataArray ['location'], 
                                    this.dataArray ['address'], 
                                    this.dataArray ['features'], 
                                    true, 
                                    {'sale':this.dataArray ['price']}, 
                                    {'sale':this.dataArray ['price']}, 
                                    this.dataArray ['bedrooms'], 
                                    this.dataArray ['bathrooms'], 
                                    this.dataArray ['garages'],
                                    {'value': this.dataArray ['area'], 'id': 0, 'unit': "ft²"}, 
                                    this.dataArray ['yearBuilt'], 0, 0, 
                                    [{'id': this.dataArray ['id'], 'name': 'CommunityFeatures', 'value': this.dataArray ['addFeatures']}], 
                                    [{'big':this.dataArray ['gallery'][0][0].MediaURLL,'medium':this.dataArray ['gallery'][0][0].MediaURL, 'small':this.dataArray ['gallery'][0][0].MediaURL,'id':0}], 
                                    [], [], 
                                    this.dataArray ['published'], '', 0)
  }
}