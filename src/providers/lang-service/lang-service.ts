import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LangServiceProvider {

  constructor(public translate: TranslateService) {
  }

  getTranslate(key: string): string {
   try{ 
   let value: string;
   this.translate.get(key).subscribe(res => {
     value = res;
   });
   return value;
  }catch{
    console.log("keyNotFoundInJson");
  }
 }
}
