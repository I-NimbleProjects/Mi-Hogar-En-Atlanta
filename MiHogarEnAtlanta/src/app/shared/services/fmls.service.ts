import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class FmlsService {
  public propertyN: any;
  public dataArray = [];
  public arrayCleanData = [];
  constructor(public httpClient: HttpClient,
              public appservice: AppService){}

  getDataProperties(){
    return this.httpClient.get<any>('https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21')
  }

  cleanData(data: any){
    data.forEach(property => {
      this.dataArray ['id'] = property['@odata.id'];
      this.dataArray ['title'] = property['BuildingName'];
      this.dataArray ['PropertyType'] = property['PropertyType'];
      this.dataArray ['PropertyStatus'] = property['MlsStatus'];
      this.dataArray ['city'] = property['City'];
      this.dataArray ['Zipcode'] = property['PostalCode'];
      this.dataArray ['Neighborhood'] = property['ElementarySchoolDistrict'];
      this.dataArray ['street'] = property['StreetName'];
      this.dataArray ['location'] = property['Coordinates'];
      this.dataArray ['address'] = property['UnparsedAddress'];
      this.dataArray ['features'] = property['ExteriorFeatures'];
      this.dataArray ['price'] = property['ListPrice'];
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
                                    this.dataArray ['price'], 
                                    this.dataArray ['price'], 
                                    this.dataArray ['bedrooms'], 
                                    this.dataArray ['bathrooms'], 
                                    this.dataArray ['garages'],
                                    {'value': this.dataArray ['area'], 'id': 0, 'unit': "ft²"}, 
                                    this.dataArray ['yearBuilt'], 0, 0, 
                                    this.dataArray ['addFeatures'], 
                                    [{'big':this.dataArray ['gallery'],'medium':this.dataArray ['gallery'], 'small':this.dataArray ['gallery'],'id':0}], 
                                    [], [], 
                                    this.dataArray ['published'], '', 0)

      this.arrayCleanData.push(this.propertyN);
    });
  }
}