import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cabinets } from "./cabinets.models";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Injectable()
export class CabinetsService extends UnsubscribeOnDestroyAdapter{
  private readonly API_URL  =`${environment.restUrl}/cabinet/get`;// hna khassni n7et url dyali
  private readonly API_URL_CREATE = `${environment.restUrl}/cabinet/create/`
  private readonly API_URL_UPDATE = `${environment.restUrl}/cabinet/update/`
  private readonly API_URL_DELETE = `${environment.restUrl}/cabinet/delete/`
  isTblLoading = true;
  dataChange: BehaviorSubject<Cabinets[]> = new BehaviorSubject<Cabinets[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Cabinets[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCabinets(): void {
    this.subs.sink = this.httpClient.get<Cabinets[]>(this.API_URL).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  addCabinets(cabinets: Cabinets): void {
    this.dialogData = cabinets;

     this.httpClient.post(this.API_URL_CREATE, cabinets).subscribe(data => {
      this.dialogData = cabinets;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateCabinets(cabinets: Cabinets): void {
    this.dialogData = cabinets;

     this.httpClient.put(this.API_URL_UPDATE + cabinets.id, cabinets).subscribe(data => {
      this.dialogData = cabinets;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteCabinets(id: number): void {
    console.log(id);

    this.httpClient.delete(this.API_URL_DELETE + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
