import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '@shared/shared.module';
import { LayoutRoutingModule } from '@app/layout/layout-routing.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, SharedModule, LayoutRoutingModule],
})
export class LayoutModule {}
