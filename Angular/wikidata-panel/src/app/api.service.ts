import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { APIURL, EditedText } from './edited-text';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private inText :string = '';
  private apiResponseSubject = new Subject<any>();
  private updatedDataId:string = '';
  private dataList: string[] = [];
  private spanDataSubject = new BehaviorSubject<any>(null);
  spanData$ = this.spanDataSubject.asObservable();
  private editedContent: any = {};
  private editedContentSubject = new BehaviorSubject<EditedText>({ text: '', spans: [], metadata:{} });
  editedContent$ = this.editedContentSubject.asObservable();


  constructor(private http:HttpClient) { }

  setText(text:any){
    this.inText = text;
  }

  getText(): any{
    return this.inText;
  }

  getUpdatedDataId(): string {
    return this.updatedDataId;
  }

  setUpdatedDataId(updatedDataId: string) {
    this.updatedDataId = updatedDataId;
  }
  updateSpanData(spanData: any) {
    this.spanDataSubject.next(spanData);
  }
  
  updateDataList(newDataList: string[]) {
    return this.dataList = newDataList;
  }

  setEditedContent(content: string, list: any, data:any): void {
    let myRes:EditedText = {text: content, spans: list, metadata: data};
    this.editedContentSubject.next(myRes);
  }

  getEditedContent() {
    return this.editedContent;
  }

  getAnalyzedText(id:number){
    const apiUrl = `${APIURL}/getEntities`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { textID: id };
    return this.http.post(apiUrl, requestBody, {headers});
  }

  
  setCombinedResponse(textNumber: any) {
    this.apiResponseSubject.next(textNumber);
  }

  getResponseSubject(){
    return this.apiResponseSubject.asObservable();
  }

}
