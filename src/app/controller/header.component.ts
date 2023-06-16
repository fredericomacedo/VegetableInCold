import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: '../view/header.component.html',
  styleUrls: ['../view/header.component.css']
})
export class HeaderComponent {
  collapsed = true;
}
