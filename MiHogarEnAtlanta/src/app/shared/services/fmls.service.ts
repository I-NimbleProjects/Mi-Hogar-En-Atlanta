import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { Property } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class FmlsService implements OnInit{
  public propertyN: any;
  public dataArray = [];
  public response;
  constructor(public httpClient: HttpClient,
              public appservice: AppService){
  }
  ngOnInit(): void {
    this.getDataProperties();
    let newProperty = new Property (1,"1","1","1",[],"1",[],[],[],{'lat': 1, 'lng': 1, 'propertyId': 1},"1",[],true,{'rent': 1, 'sale':1},{'rent': 1, 'sale':1}, 1, 1, 1, {'id':1, 'unit':"1", 'value':1}, 1, 1, 1, [], [], [], [],"1","1",1)
    this.appservice.Data.properties.push(newProperty);
  }

  // async getDataProperties() {
  //    this.response = await this.httpClient.get<any>('https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21').toPromise().then(res => {
  //     // let newProperty = new Property (res.value.@odata.id)
  //     this.dataArray = this.response;
  //     console.log(res);
  //     // this.appservice.Data.properties.push(newProperty);
  //   });
  // }

  getDataProperties(){
  return this.httpClient.get<any>('https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21')
  }

  cleanData(data: any){
    //arreglo donde se guardara la data correcta (empieza vacio)
    let arrayCleanData = [];
    let iterator;
// bucle que recorra toda la info de FMLS
    data.forEach(arrayCleanData => iterator = arrayCleanData.values())
    const fmlsId = iterator.filter(x => x.value == '@odata.id');
    const fmlsTitle = iterator.filter(x => x.value == 'BuildingName');
    const fmlsPropertyType = iterator.filter(x => x.value == 'PropertyType');
    const fmlsPropertyStatus = iterator.filter(x => x.value == 'MlsStatus');
    const fmlsCity = iterator.filter(x => x.value == 'City');
    const fmlsZipcode = iterator.filter(x => x.value == 'PostalCode');
    const fmlsNeighborhood = iterator.filter(x => x.value == 'ElementarySchoolDistrict');
    const fmlsStreet = iterator.filter(x => x.value == 'StreetName');
    const fmlsLocation = iterator.filter(x => x.value == 'Coordinates');
    const fmlsAddress = iterator.filter(x => x.value == 'UnparsedAddress');
    const fmlsFeatures = iterator.filter(x => x.value == 'ExteriorFeature', 'AccessibilityFeatures');
    const fmlsPrice = iterator.filter(x => x.value == 'PriceList');
    const fmlsBedrooms = iterator.filter(x => x.value == 'BedroomsTotal');
    const fmlsBathrooms = iterator.filter(x => x.value == 'BathroomsTotalInteger');
    const fmlsGarages = iterator.filter(x => x.value == 'GarageSpaces');
    const fmlsArea = iterator.filter(x => x.value == 'LotSizeSquareFeets');
    const fmlsYearBuilt = iterator.filter(x => x.value == 'YearBuilt');
    const fmlsAddFeatures = iterator.filter(x => x.value == 'FirePlaceFeatures', 'CommunityFeatures');
    const fmlsGallery = iterator.filter(x => x.value.media == 'MediaURL');
    const fmlsPublished = iterator.filter(x => x.value == 'OnMarketDate');
// Iniciar una variable Property
    let varProperty = new Property(fmlsId,fmlsTitle,'',fmlsPropertyType,fmlsPropertyStatus,fmlsCity,fmlsZipcode,fmlsNeighborhood,fmlsStreet,fmlsLocation,fmlsAddress,fmlsFeatures,false,fmlsPrice, {'rent':0, 'sale':0},fmlsBedrooms,fmlsBathrooms,fmlsGarages,fmlsArea,fmlsYearBuilt,0,0,fmlsAddFeatures,fmlsGallery,[],[],fmlsPublished,'',0);
// // asignar valor de fmls a un atributo de Property hacer push a ese arreglo
    varProperty = arrayCleanData.push(data)
// // retornar arreglo lleno con Properties
    return varProperty;
  }
}