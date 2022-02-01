import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Property, Location } from './app.models';
import { AppSettings } from './app.settings';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from './shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { TranslateService } from '@ngx-translate/core';

export class Data{
  constructor(public properties: Property[],
              public compareList: Property[],
              public favorites: Property[],
              public locations: Location[]) {}
  // setDataProperties(){
  //   this.dataArray.forEach(d => { this.propertyN.push(Property[])
  //   })
  // }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public Data

  public url = environment.url + '/assets/data/'; 
  public apiKey = 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I';
  
  constructor(public http:HttpClient, 
              private bottomSheet: MatBottomSheet, 
              private snackBar: MatSnackBar,
              public appSettings:AppSettings,
              public dialog: MatDialog,
              public translateService: TranslateService,
              @Inject(PLATFORM_ID) private platformId: Object) {
                let compareTMP = [];
                if (localStorage.getItem('compare') !== null){
                  compareTMP = JSON.parse(localStorage.getItem('compare'));
                }
                let favoritesTMP = [];
                if (localStorage.getItem('favorites') !== null){
                  favoritesTMP = JSON.parse(localStorage.getItem('favorites'));
                }
                //Otros
                this.Data = new Data(
                    [], // properties
                    compareTMP, // compareList
                    favoritesTMP, // favorites
                    []  // locations
                )
              }
    
  public getProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'properties.json');
  }

  public getPropertyById(id): Observable<Property>{
    return this.http.get<Property>(this.url + 'property-' + id + '.json');
  }

  public getFeaturedProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'featured-properties.json');
  } 

  public getRelatedProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'related-properties.json');
  }

  public getPropertiesByAgentId(agentId): Observable<Property[]>{
    return this.http.get<Property[]>(this.url + 'properties-agentid-' + agentId + '.json');
  }

  public getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.url + 'locations.json');
  }

  public getAddress(lat = 33.94644, lng = -84.22954){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey);
  }

  public getLatLng(address){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key='+this.apiKey+'&address='+address);
  }

  public getFullAddress(lat = 33.94644, lng = -84.22954){ 
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey).subscribe(data =>{ 
      return data['results'][0]['formatted_address'];
    });
  }

  stringCompare: any;
  objectCompare: any;
  stringfavorites: any;
  objectfavorites: any;

  public addToCompare(property:Property, component, direction){
    if(!this.Data.compareList.filter(item=>item.id == property.id)[0]){
      this.Data.compareList.push(property);
      this.stringCompare = localStorage.setItem("compare", JSON.stringify(this.Data.compareList)); 
      this.bottomSheet.open(component, {
        direction: direction
      }).afterDismissed().subscribe(isRedirect=>{  
        if(isRedirect){
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0,0);
          }
        }        
      });
    } 
  }

  public addToFavorites(property:Property, direction){
    if(!this.Data.favorites.filter(item=>item.id == property.id)[0]){
      this.Data.favorites.push(property);
      this.stringfavorites = localStorage.setItem("favorites", JSON.stringify(this.Data.favorites));
      this.snackBar.open('La propiedad "' + property.title + '" ha sido agregada a favoritos.', '×', {
        verticalPosition: 'top',
        duration: 3000,
        direction: direction 
      });  
    }    
  }

  public openConfirmDialog(title:string, message:string) {  
    const dialogData = new ConfirmDialogModel(title, message); 
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    }); 
    return dialogRef; 
  }

  public openAlertDialog(message:string) {   
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: "400px",
      data: message
    }); 
    return dialogRef; 
  }

  public getTranslateValue(key:string, param:string = null){  
    let value = null;
    this.translateService.get(key, { param: param }).subscribe((res: string) => {
      value = res;
    }) 
    return value; 
  }

  public getPropertyTypes(){
    return [ 
      { id: 1, name: 'Oficina' },
      { id: 2, name: 'Casa' },
      { id: 3, name: 'Apartamento' }
    ]
  }

  public getPropertyStatuses(){
    return [ 
      { id: 1, name: 'En Venta' },
      { id: 2, name: 'En Renta' },
      { id: 3, name: 'Casa Abierta' },
      { id: 4, name: 'Sin Tarifas' },
      { id: 5, name: 'Oferta' },
      { id: 6, name: 'Vendida' }
    ]
  }

  public getCities(){
    return [ 
      { id: 1, name: 'Acworth' },
      { id: 2, name: 'Atlanta' },
      { id: 3, name: 'Austell' },
      { id: 4, name: 'College Park' },
      { id: 5, name: 'Dacula' },
      { id: 6, name: 'Duluth' },
      { id: 7, name: 'Ellenwood' },
      { id: 8, name: 'Forest Park' },
      { id: 9, name: 'Gainesville' },
      { id: 10, name: 'Hamptom' },
      { id: 11, name: 'Lawrenceville' },
      { id: 12, name: 'Lilburn' },
      { id: 13, name: 'Marietta' },
      { id: 14, name: 'Mcdnought' },
      { id: 15, name: 'Norcross' },
      { id: 16, name: 'Rex' },
      { id: 17, name: 'Smyrna' },
      { id: 18, name: 'Snellville' },
      { id: 19, name: 'Stockbridge' },
      { id: 20, name: 'Stone Mountain' },
      { id: 21, name: 'Destineyhaven'}
    ]
  }

  public getNeighborhoods(){
    return [      
      { id: 1, name: 'Astoria', cityId: 1 },
      { id: 2, name: 'Midtown', cityId: 1 },
      { id: 3, name: 'Chinatown', cityId: 1 }, 
      { id: 4, name: 'Austin', cityId: 2 },
      { id: 5, name: 'Englewood', cityId: 2 },
      { id: 6, name: 'Riverdale', cityId: 2 },      
      { id: 7, name: 'Hollywood', cityId: 3 },
      { id: 8, name: 'Sherman Oaks', cityId: 3 },
      { id: 9, name: 'Highland Park', cityId: 3 },
      { id: 10, name: 'Belltown', cityId: 4 },
      { id: 11, name: 'Queen Anne', cityId: 4 },
      { id: 12, name: 'Green Lake', cityId: 4 }      
    ]
  }

  public getStreets(){
    return [      
      { id: 1, name: 'Astoria Street #1', cityId: 1, neighborhoodId: 1},
      { id: 2, name: 'Astoria Street #2', cityId: 1, neighborhoodId: 1},
      { id: 3, name: 'Midtown Street #1', cityId: 1, neighborhoodId: 2 },
      { id: 4, name: 'Midtown Street #2', cityId: 1, neighborhoodId: 2 },
      { id: 5, name: 'Chinatown Street #1', cityId: 1, neighborhoodId: 3 }, 
      { id: 6, name: 'Chinatown Street #2', cityId: 1, neighborhoodId: 3 },
      { id: 7, name: 'Austin Street #1', cityId: 2, neighborhoodId: 4 },
      { id: 8, name: 'Austin Street #2', cityId: 2, neighborhoodId: 4 },
      { id: 9, name: 'Englewood Street #1', cityId: 2, neighborhoodId: 5 },
      { id: 10, name: 'Englewood Street #2', cityId: 2, neighborhoodId: 5 },
      { id: 11, name: 'Riverdale Street #1', cityId: 2, neighborhoodId: 6 }, 
      { id: 12, name: 'Riverdale Street #2', cityId: 2, neighborhoodId: 6 },
      { id: 13, name: 'Hollywood Street #1', cityId: 3, neighborhoodId: 7 },
      { id: 14, name: 'Hollywood Street #2', cityId: 3, neighborhoodId: 7 },
      { id: 15, name: 'Sherman Oaks Street #1', cityId: 3, neighborhoodId: 8 },
      { id: 16, name: 'Sherman Oaks Street #2', cityId: 3, neighborhoodId: 8 },
      { id: 17, name: 'Highland Park Street #1', cityId: 3, neighborhoodId: 9 },
      { id: 18, name: 'Highland Park Street #2', cityId: 3, neighborhoodId: 9 },
      { id: 19, name: 'Belltown Street #1', cityId: 4, neighborhoodId: 10 },
      { id: 20, name: 'Belltown Street #2', cityId: 4, neighborhoodId: 10 },
      { id: 21, name: 'Queen Anne Street #1', cityId: 4, neighborhoodId: 11 },
      { id: 22, name: 'Queen Anne Street #2', cityId: 4, neighborhoodId: 11 },
      { id: 23, name: 'Green Lake Street #1', cityId: 4, neighborhoodId: 12 },
      { id: 24, name: 'Green Lake Street #2', cityId: 4, neighborhoodId: 12 }      
    ]
  }

  public getFeatures(){
    return [ 
      { id: 1, name: 'Aire acondicionado', selected: false },
      { id: 2, name: 'Parrillera', selected: false },
      { id: 3, name: 'Secadora', selected: false },
      { id: 4, name: 'Microondas', selected: false }, 
      { id: 5, name: 'Refrigerador', selected: false },
      { id: 6, name: 'TV Cable', selected: false },
      { id: 7, name: 'Sauna', selected: false },
      { id: 8, name: 'WiFi', selected: false },
      { id: 9, name: 'Fireplace', selected: false },
      { id: 10, name: 'Piscina', selected: false },
      { id: 11, name: 'Gimnasio', selected: false },
    ]
  }


  public getHomeCarouselSlides(){
    return this.http.get<any[]>(this.url + 'slides.json');
  }


  public filterData(data, params: any, sort?, page?, perPage?){ 
   
    if(params){

      if(params.propertyType){
        data = data.filter(property => property.propertyType == params.propertyType.name)
      }

      if(params.propertyStatus && params.propertyStatus.length){       
        let statuses = [];
        params.propertyStatus.forEach(status => { statuses.push(status.name) });           
        let properties = [];
        data.filter(property =>
          property.propertyStatus.forEach(status => {             
            if(statuses.indexOf(status) > -1){                 
              if(!properties.includes(property)){
                properties.push(property);
              }                
            }
          })
        );
        data = properties;
      }

      if(params.price){
        if(this.appSettings.settings.currency == 'USD'){          
          if(params.price.from){
            data = data.filter(property => {
              if(property.priceDollar.sale && property.priceDollar.sale >= params.price.from ){
                return true;
              }
              if(property.priceDollar.rent && property.priceDollar.rent >= params.price.from ){
                return true;
              } 
              return false;
            });
          }
          if(params.price.to){
            data = data.filter(property => {
              if(property.priceDollar.sale && property.priceDollar.sale <= params.price.to){
                return true;
              }
              if(property.priceDollar.rent && property.priceDollar.rent <= params.price.to){
                return true;
              } 
              return false;
            });          
          }
        }
        if(this.appSettings.settings.currency == 'EUR'){
          if(params.price.from){
            data = data.filter(property => {
              if(property.priceEuro.sale && property.priceEuro.sale >= params.price.from ){
                return true;
              }
              if(property.priceEuro.rent && property.priceEuro.rent >= params.price.from ){
                return true;
              } 
              return false;
            });

          }
          if(params.price.to){
            data = data.filter(property => {
              if(property.priceEuro.sale && property.priceEuro.sale <= params.price.to){
                return true;
              }
              if(property.priceEuro.rent && property.priceEuro.rent <= params.price.to){
                return true;
              } 
              return false;
            });
          }
        }        
      }  

      if(params.city){
        data = data.filter(property => property.city == params.city.name)
      }

      if(params.zipCode){
        data = data.filter(property => property.zipCode == params.zipCode)
      }
      
      if(params.neighborhood && params.neighborhood.length){       
        let neighborhoods = [];
        params.neighborhood.forEach(item => { neighborhoods.push(item.name) });           
        let properties = [];
        data.filter(property =>
          property.neighborhood.forEach(item => {             
            if(neighborhoods.indexOf(item) > -1){                 
              if(!properties.includes(property)){
                properties.push(property);
              }                
            }
          })
        );
        data = properties;
      }

      if(params.street && params.street.length){       
        let streets = [];
        params.street.forEach(item => { streets.push(item.name) });           
        let properties = [];
        data.filter(property =>
          property.street.forEach(item => {             
            if(streets.indexOf(item) > -1){                 
              if(!properties.includes(property)){
                properties.push(property);
              }                
            }
          })
        );
        data = properties;
      }

      if(params.bedrooms){
        if(params.bedrooms.from){
          data = data.filter(property => property.bedrooms >= params.bedrooms.from)
        }
        if(params.bedrooms.to){
          data = data.filter(property => property.bedrooms <= params.bedrooms.to)
        }
      } 
      
      if(params.bathrooms){
        if(params.bathrooms.from){
          data = data.filter(property => property.bathrooms >= params.bathrooms.from)
        }
        if(params.bathrooms.to){
          data = data.filter(property => property.bathrooms <= params.bathrooms.to)
        }
      } 

      if(params.garages){
        if(params.garages.from){
          data = data.filter(property => property.garages >= params.garages.from)
        }
        if(params.garages.to){
          data = data.filter(property => property.garages <= params.garages.to)
        }
      } 

      if(params.area){
        if(params.area.from){
          data = data.filter(property => property.area.value >= params.area.from)
        }
        if(params.area.to){
          data = data.filter(property => property.area.value <= params.area.to)
        }
      } 

      if(params.yearBuilt){
        if(params.yearBuilt.from){
          data = data.filter(property => property.yearBuilt >= params.yearBuilt.from)
        }
        if(params.yearBuilt.to){
          data = data.filter(property => property.yearBuilt <= params.yearBuilt.to)
        }
      }

      if(params.features){       
        let arr = [];
        params.features.forEach(feature => { 
          if(feature.selected)
            arr.push(feature.name);
        });  
        if(arr.length > 0){
          let properties = [];
          data.filter(property =>
            property.features.forEach(feature => {             
              if(arr.indexOf(feature) > -1){                 
                if(!properties.includes(property)){
                  properties.push(property);
                }                
              }
            })
          );
          data = properties;
        }         
        
      }
      
    }

    // console.log(data)

    //for show more properties mock data 
    for (var index = 0; index < 2; index++) {
      data = data.concat(data);        
    }     
     
    this.sortData(sort, data);
    return this.paginator(data, page, perPage)
  }

  public sortData(sort, data){
    if(sort){
      switch (sort) {
        case 'Nuevo':
          data = data.sort((a, b)=> {return <any>new Date(b.published) - <any>new Date(a.published)});           
          break;
        case 'Viejo':
          data = data.sort((a, b)=> {return <any>new Date(a.published) - <any>new Date(b.published)});           
          break;
        case 'Popular':
          data = data.sort((a, b) => { 
            if(a.ratingsValue/a.ratingsCount < b.ratingsValue/b.ratingsCount){
              return 1;
            }
            if(a.ratingsValue/a.ratingsCount > b.ratingsValue/b.ratingsCount){
              return -1;
            }
            return 0; 
          });
          break;
        case 'Precio (Bajo a Alto)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.v.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          break;
        case 'Precio (Alto a Bajo)':
          if(this.appSettings.settings.currency == 'USD'){
            data = data.sort((a,b) => {
              if((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)){
                return 1;
              }
              if((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          if(this.appSettings.settings.currency == 'EUR'){
            data = data.sort((a,b) => {
              if((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.v.rent)){
                return 1;
              }
              if((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.priceEuro.rent)){
                return -1;
              }
              return 0;  
            }) 
          }
          break;
        default:
          break;
      }
    }
    return data;
  }

  public paginator(items, page?, perPage?) { 
    var page = page || 1,
    perPage = perPage || 4,
    offset = (page - 1) * perPage,   
    paginatedItems = items.slice(offset).slice(0, perPage),
    totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination:{
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      }
    };
  }



  public getTestimonials(){
    return [
        { 
            text: 'Muy buen servicio los recomiendo. Muy buena ayuda desde el principio hasta el final👍👌👌Carmela Moreno y su equipo son excelentes  muy eficientes si quieren comprar o vender llámalos a ellos ahora', 
            author: 'Alberto Arias', 
            // position: 'General Director', 
            image: 'assets/images/profile/Alberto Arias.jpg' 
        },
        { 
            text: 'excelente equipo los recomiendo al 100 más k ayudar se toman tan serio y con tanto amor su trabajo k a uno le aclaran cada duda cada paso en el proseso de la compra gracias por la ayuda mil bendiciones', 
            author: 'Martha Mary Lopez', 
            // position: 'Housewife', 
            image: 'assets/images/profile/Martha Mary Lopez.jpg' 
        },
        { 
            text: '¡Guau! ¿Por dónde empiezo? Esta experiencia no ha sido más que increíble, por supuesto que hubo baches en el camino pero Carmen y Carmela siempre estuvieron tan atentas a nuestras necesidades y nuestras preocupaciones. Si estás buscando comprar o vender tu casa, definitivamente te recomiendo estas encantadoras damas, ¡siempre te atenderán a ti y a tus necesidades!', 
            author: 'Zoima Rocha', 
            // position: 'Blogger', 
            image: 'assets/images/profile/Zoima Rocha.jpg' 
        },
        { 
            text: '100% Recomendado, son un excelente equipo que me ayudaron a comprar y vender mi casa. Te aclaran todas tus dudas y si no sabes algo te ayudan.', 
            author: 'Emanuel Esquivel', 
            // position: 'Marketing Manager', 
            image: 'assets/images/profile/Emanuel Esquivel.jpg' 
        }
    ];
  }

  public getImagesNosotros(){
    return [
      {
        image: 'assets/images/fotosContact/image3.jpg'
      },
      {
        image: 'assets/images/fotosContact/image4.jpg'
      },
      {
        image: 'assets/images/fotosContact/image5.jpg'
      },
      {
        image: 'assets/images/fotosContact/image6.jpg'
      },
    ];
  }

  public getAgents(){
    return [        
        { 
            id: 1,
            fullName: 'Carmela Moreno',
            // desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
            organization: 'Mi Hogar En Atlanta',
            email: 'mihogarenatlanta@gmail.com ',
            phone: '+1 (678) 744-8007',
            social: {
              facebook: 'https://www.facebook.com/mihogarenatlanta/',
              twitter: 'lusia',
              linkedin: 'https://www.linkedin.com/in/carmela-moreno-1a7392148/',
              instagram: 'https://www.instagram.com/mihogarenatlanta/',
              // website: 'https://lusia.manuel.com'
            },
            ratingsCount: 6,
            ratingsValue: 480,
            image: 'assets/images/agents/a-1-min.jpg' 
        },
        { 
            id: 2,
            fullName: 'Carmen Barreda',
            // desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
            organization: 'Mi Hogar En Atlanta',
            email: 'Barredarealtor@gmail.com',
            phone: '+1 (678) 790-0109',
            social: {
              facebook: '',
              twitter: '',
              linkedin: '',
              instagram: '',
              // website: 'https://andy.warhol.com'
            },
            ratingsCount: 4,
            ratingsValue: 400,
            image: 'assets/images/agents/a-2-min.jpg' 
        },        
        // { 
        //     id: 3,
        //     fullName: 'Tereza Stiles',
        //     // desc: 'Phasellus sed metus leo. Donec laoreet, lacus ut suscipit convallis, erat enim eleifend nulla, at sagittis enim urna et lacus.',            
        //     organization: 'Mi Hogar En Atlanta',
        //     email: 'mihogarenatlanta@gmail.com ',
        //     phone: '(214) 617-2614',
        //     social: {
        //       facebook: '',
        //       twitter: '',
        //       linkedin: '',
        //       instagram: '',
        //       // website: 'https://tereza.stiles.com'
        //     },
        //     ratingsCount: 4,
        //     ratingsValue: 380,
        //     image: 'assets/images/agents/a-3.jpg' 
        // }
    ];
  }



  public getClients(){
    return [  
        { name: 'aloha', image: 'assets/images/clients/aloha.png' },
        { name: 'dream', image: 'assets/images/clients/dream.png' },  
        { name: 'congrats', image: 'assets/images/clients/congrats.png' },
        { name: 'best', image: 'assets/images/clients/best.png' },
        { name: 'original', image: 'assets/images/clients/original.png' },
        { name: 'retro', image: 'assets/images/clients/retro.png' },
        { name: 'king', image: 'assets/images/clients/king.png' },
        { name: 'love', image: 'assets/images/clients/love.png' },
        { name: 'the', image: 'assets/images/clients/the.png' },
        { name: 'easter', image: 'assets/images/clients/easter.png' },
        { name: 'with', image: 'assets/images/clients/with.png' },
        { name: 'special', image: 'assets/images/clients/special.png' },
        { name: 'bravo', image: 'assets/images/clients/bravo.png' }
    ];
  }


}
