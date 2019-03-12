import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const scriptmenu = document.createElement("script");
    scriptmenu.src = "assets/js/menu.js";
    document.body.appendChild(scriptmenu);
  }

}
