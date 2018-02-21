import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkPage } from './work';

@NgModule({
  declarations: [
    WorkPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkPage),
  ],
})
export class WorkPageModule {}
