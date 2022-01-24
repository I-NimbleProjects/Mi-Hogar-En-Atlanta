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
  public propertyNS: any;
  public dataArray = [];
  public arrayCleanData = [];
  public galleryURL = "";
  constructor(public httpClient: HttpClient,
              public appservice: AppService,){}


  getDataProperties(){
    return this.httpClient.get<any>('https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21')
  }

  cleanData(data: any){
    data.forEach(property => {
      this.dataArray ['id'] = property['ListingKey'];
      this.dataArray ['title'] = property['BuildingName'];
      this.dataArray ['PropertyType'] = property['PropertyType'];
      this.dataArray ['PropertyStatus'] = property['MlsStatus'];
      this.dataArray ['city'] = property['City'];
      this.dataArray ['Zipcode'] = property['PostalCode'];
      this.dataArray ['Neighborhood'] = property['CityRegion'];
      this.dataArray ['street'] = property['StreetName'];
      this.dataArray ['location'] = property['Coordinates'];
      let lat = this.dataArray ['location'][0]
      let lng = this.dataArray ['location'][1];
      this.dataArray ['address'] = property['UnparsedAddress'];
      this.dataArray ['features'] = property['ExteriorFeatures'];
      this.dataArray ['price'] = property['ListPrice'];
      this.dataArray ['rent'] = property['RentIncludes'];
      this.dataArray ['bedrooms'] = property['BedroomsTotal'];
      this.dataArray ['bathrooms'] = property['BathroomsTotalInteger'];
      this.dataArray ['garages'] = property['GarageSpaces'];
      this.dataArray ['area'] = [property['LotSizeSquareFeet']];
      this.dataArray ['yearBuilt'] = property['YearBuilt'];
      this.dataArray ['addFeatures'] = [data ['CommunityFeatures'], data ['AccessibilityFeatures'], data ['PatioAndPorchFeatures'], data ['LotFeatures']];
      this.dataArray ['gallery'] = [property['Media']];
      this.dataArray ['published'] = property['OnMarketDate'];
      this.dataArray ['lastUpdated'] = property['StatusChangeTimestamp'];

      this.propertyN = new Property (this.dataArray['id'], 
                                    this.dataArray ['title'], '',
                                    this.dataArray ['PropertyType'], 
                                    this.dataArray ['PropertyStatus'], 
                                    this.dataArray ['city'], 
                                    this.dataArray ['Zipcode'], 
                                    [this.dataArray ['Neighborhood']], 
                                    [this.dataArray ['street']], 
                                    {'propertyId': this.dataArray['id'], 'lat': lat, 'lng': lng}, 
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
                                    [{'big':this.dataArray ['gallery'][0][0].MediaURL,'medium':this.dataArray ['gallery'][0][0].MediaURL, 'small':this.dataArray ['gallery'][0][0].MediaURL}], 
                                    [], [], 
                                    this.dataArray ['published'], 
                                    this.dataArray ['lastUpdated'], 0)

      this.arrayCleanData.push(this.propertyN);
      console.log(this.arrayCleanData)
    });
  }
  getListingKey(id){
    return this.httpClient.get<any>('https://api.bridgedataoutput.com/api/v2/OData/test/Property('+ id + ')?access_token=6baca547742c6f96a6ff71b138424f21')
  }

  singleFmlsData(data: any){
    this.dataArray ['id'] = data['ListingKey'];
    this.dataArray ['title'] = data['BuildingName'];
    this.dataArray ['PropertyType'] = data['PropertyType'];
    this.dataArray ['PropertyStatus'] = data['MlsStatus'];
    this.dataArray ['city'] = data['City'];
    this.dataArray ['Zipcode'] = data['PostalCode'];
    this.dataArray ['Neighborhood'] = data['CityRegion'];
    this.dataArray ['street'] = data['StreetName'];
    this.dataArray ['location'] = data['Coordinates'];
    let lat = this.dataArray ['location'][0]
    let lng = this.dataArray ['location'][1];
    this.dataArray ['address'] = data['UnparsedAddress'];
    this.dataArray ['features'] = data['ExteriorFeatures'];
    this.dataArray ['price'] = data['ListPrice'];
    this.dataArray ['rent'] = data['RentIncludes'];
    this.dataArray ['bedrooms'] = data['BedroomsTotal'];
    this.dataArray ['bathrooms'] = data['BathroomsTotalInteger'];
    this.dataArray ['garages'] = data['GarageSpaces'];
    this.dataArray ['area'] = [data['LotSizeSquareFeet']];
    this.dataArray ['yearBuilt'] = data['YearBuilt'];
    this.dataArray ['addFeatures'] = [data ['BuildingFeatures'], data ['CommunityFeatures'], data ['AccessibilityFeatures']];
    this.dataArray ['gallery'] = [data['Media']];
    this.dataArray ['published'] = data['OnMarketDate'];
    this.dataArray ['lastUpdated'] = data['StatusChangeTimestamp'];

    this.propertyNS = new Property (this.dataArray['id'], 
                                    this.dataArray ['title'], '',
                                    this.dataArray ['PropertyType'], 
                                    [this.dataArray ['PropertyStatus']], 
                                    this.dataArray ['city'], 
                                    this.dataArray ['Zipcode'], 
                                    [this.dataArray ['Neighborhood']], 
                                    [this.dataArray ['street']], 
                                    {'propertyId': this.dataArray['id'], 'lat': lat, 'lng': lng}, 
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
                                    [{'big':this.dataArray ['gallery'][0][0].MediaURL,'medium':this.dataArray ['gallery'][0][0].MediaURL, 'small':this.dataArray ['gallery'][0][0].MediaURL}], 
                                    [], [], 
                                    this.dataArray ['published'], 
                                    this.dataArray ['lastUpdated'], 0)
  }
}