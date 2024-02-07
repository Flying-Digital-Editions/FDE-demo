import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import * as DocxtemplaterModule from 'docxtemplater';
import { testo1, testo2, testo3 } from '../edited-text';
const Docxtemplater = DocxtemplaterModule as any;


@Component({
  selector: 'app-loading-mode',
  templateUrl: './loading-mode.component.html',
  styleUrls: ['./loading-mode.component.css']
})
export class LoadingModeComponent {
  title = 'FDE - Flying Digital Editions';
  searchText: string = '';
  entityData: any;
  formData: any;
  fileContent: string | null = null;
  fileUploaded: boolean = false;
  isEnabled = false;
  fileName:string = '';
  idText: any = null;
 
  constructor(private apiService: ApiService, private router: Router){}
  ngOnInit(): void {}

  goToUrl(path:any){
    this.router.navigate(path);
  }
  

  setText(id:any){
    this.idText = id;
    switch(id){
      case 1: 
        this.searchText = testo1;
        this.isEnabled = true;
        break;
      case 2:
        this.searchText = testo2;
        this.isEnabled = true;
        break;
      case 3:
        this.searchText = testo3;
        this.isEnabled = true;
        break;
      default:
        alert("Text not found");
    }
  }

  sendText() {
    const id = this.idText;
    switch(id){
      case 1:
        this.apiService.setText(testo1);
          this.apiService.getAnalyzedText(id).subscribe(response => {
            this.apiService.setCombinedResponse(response);
          });
          break;
      case 2:
        this.apiService.setText(testo2);
          this.apiService.getAnalyzedText(id).subscribe(response => {
            this.apiService.setCombinedResponse(response);
          });
          break;
      case 3:
        this.apiService.setText(testo3);
          this.apiService.getAnalyzedText(id).subscribe(response => {
            this.apiService.setCombinedResponse(response);
          });
          break;
      default:
        alert("Text analysis not available");
    }
  }

}


