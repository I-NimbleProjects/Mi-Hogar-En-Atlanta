import { Injectable } from '@angular/core';
import { Apollo, gql, Query} from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

// const QUERY = gql`
// {
//   value {
//     @odata.id
//     ListPrice
//     LotSizeSquareFeet
//     BathroomsTotalInteger
//     BedroomsTotal
//     FirePlacesTotal
//     GarageSpaces
//     YearBuilt
//     PropertyType
//   }
//   Cooling
//   Heating
//   PoolPrivateYN
//   Media {
//     {
//       MediaURL
//     }
//     {
//       MediaURL
//     }
//     {
//       MediaURL
//     }
//     {
//       MediaURL
//     }
//     {
//       MediaURL
//     }
//     {
//       MediaURL
//     }
//     {
//       MediaURL
//     }
//   }
//   City
//   PostalCode
//   StateOrProvince
//   StreetName
//   CoolingYN
// }`

@Injectable({
  providedIn: 'root'
})
export class FmlsService {

//   private propertiesSubjext = new BehaviorSubject<any[]>(null)
//   properties$ = this.propertiesSubjext.asObservable();

//   constructor(private apollo: Apollo) {
//     this.getDataAPI();
//    }

//    private getDataAPI(): void {
//      this.apollo.watchQuery<any>({
//        query: QUERY
//      }).valueChanges.pipe(
//        take(1),
//        tap(res => {
//          console.log(res);
//        })
//      ).subscribe();
//    }
}
