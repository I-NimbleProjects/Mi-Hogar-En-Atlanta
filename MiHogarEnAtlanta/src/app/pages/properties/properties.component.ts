import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { of, Subscription } from 'rxjs'; 
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'; 
import { Settings, AppSettings } from '../../app.settings';
import { AppService } from '../../app.service';
import { Property, Pagination } from '../../app.models'; 
import { isPlatformBrowser } from '@angular/common';
import { FmlsService } from 'src/app/shared/services/fmls.service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };
  public properties: Property[];
  public viewType: string = 'grid';
  public viewCol: number = 33.3;
  public count: number = 12;
  public sort: string;
  public searchFields: any;
  public removedSearchField: string;
  public pagination:Pagination = new Pagination(1, this.count, null, 2, 0, 0); 
  public message:string;
  public watcher: Subscription;

  public settings: Settings
  constructor(public appSettings:AppSettings, 
              public appService:AppService, 
              public mediaObserver: MediaObserver,
              public fmls:FmlsService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.settings = this.appSettings.settings;    
    this.watcher = mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {
      if (change.mqAlias == 'xs') {
        this.sidenavOpen = false;
        this.viewCol = 100;
      }
      else if(change.mqAlias == 'sm'){
        this.sidenavOpen = false;
        this.viewCol = 50;
      }
      else if(change.mqAlias == 'md'){
        this.viewCol = 50;
        this.sidenavOpen = true;
      }
      else{
        this.viewCol = 33.3;
        this.sidenavOpen = true;
      }
    });

  }

  ngOnInit() {
    this.getProperties(this.sort, this.fmls.limit, this.fmls.offset);
  }

  ngOnDestroy(){ 
    this.watcher.unsubscribe();
  }

  public async getProperties(sort, limit, offset){
    if(sort = 'Ordenar por defecto' || 'Sort by default'){
      let data = await this.fmls.getDataProperties(limit, offset)
      this.fmls.cleanData(data.bundle)
    }else if(sort= 'Precio (Bajo a Alto)' || 'Price (Low to High)'){
      let data = await this.fmls.getAscend()
      this.fmls.cleanData(data.bundle)
    }else if(sort = 'Precio (Alto a Bajo)' || 'Price (High to Low)'){
      let data = await this.fmls.getDescend()
      this.fmls.cleanData(data.bundle)
    }else if(sort = 'Nuevo' || 'New'){
     let data = await this.fmls.getNew()
     this.fmls.cleanData(data.bundle)
    }else if(sort = 'Viejo' || 'Old'){
      let data = await this.fmls.getOld()
      this.fmls.cleanData(data.bundle)
    }
      let result = this.filterData(this.fmls.uniqueData); 
      if(result.data.length == 0){
        this.properties.length = 0;
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);  
        this.message = 'Sin Resultados';
        return false;
      } 
      this.properties = result.data; 
      this.pagination = result.pagination;
      this.message = null;
  }

  public resetPagination(){ 
    if(this.paginator){
      this.paginator.pageIndex = 0;
    }
    this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
  }

  public filterData(data){
    return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
  }

  public searchClicked(){ 
    this.properties.length = 0;
    this.getProperties(this.sort, this.fmls.limit, this.fmls.offset); 
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }  
  }
  public searchChanged(event){
    event.valueChanges.subscribe(() => {   
      this.resetPagination(); 
      this.searchFields = event.value;
      setTimeout(() => {      
        this.removedSearchField = null;
      });
      if(!this.settings.searchOnBtnClick){     
        this.properties.length = 0;  
      }            
    }); 
    event.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => { 
      if(!this.settings.searchOnBtnClick){     
        this.getProperties(this.sort, this.fmls.limit, this.fmls.offset); 
      }
    });       
  } 
  public removeSearchField(field){ 
    this.message = null;   
    this.removedSearchField = field; 
  } 


  public changeCount(count){
    this.count = count;   
    this.properties.length = 0;
    this.resetPagination();
    this.getProperties(this.sort, this.fmls.limit, this.fmls.offset);
  }
  public changeSorting(sort){    
    this.sort = sort; 
    this.properties.length = 0;
    this.getProperties(sort, this.fmls.limit, this.fmls.offset)
  }
  public changeViewType(obj){ 
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol; 
  } 


  public onPageChange(e){ 
    this.pagination.page = e.pageIndex + 1;
    this.getProperties(this.sort, this.fmls.limit, this.fmls.offset);
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    } 
  }

}