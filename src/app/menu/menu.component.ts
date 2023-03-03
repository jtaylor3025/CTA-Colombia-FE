import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  opened = true;
  title: string = 'Centro de trabajos en alturas CTA';
  showSubmenu = false;
  showSubmenu2 = false;

  toggleSubmenu() {
    this.showSubmenu = !this.showSubmenu;
  }
  toggleSubmenu2() {
    this.showSubmenu2 = !this.showSubmenu2;
  }

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  constructor() {}

  ngOnInit(): void {}
  panelOpenState = false;
}
