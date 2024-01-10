import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ]
})
export class SharedModule { }
