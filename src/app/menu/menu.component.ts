import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  opened = true;
  title: string = 'Centro de trabajos en alturas CTA';

  constructor() {}

  ngOnInit(): void {}
  panelOpenState = false;
}
