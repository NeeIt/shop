import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {


  constructor(private navService:NavService) { }

  ngOnInit() {

  }

}
