import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroceryPage } from './grocery';

@NgModule({
  declarations: [
    GroceryPage,
  ],
  imports: [
    IonicPageModule.forChild(GroceryPage),
  ],
})
export class GroceryPageModule {}
