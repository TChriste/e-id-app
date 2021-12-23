import { Component, OnInit } from '@angular/core';
import { TrustedAuthorityService } from 'src/app/services/trusted-authority.service';

@Component({
  selector: 'app-propositions',
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.scss']
})
export class PropositionsComponent implements OnInit {

  propositions: string[] = ["test"];

  constructor(private _trustedAuthorityService: TrustedAuthorityService) { }

  ngOnInit(): void {
    this._trustedAuthorityService.getRecords().subscribe((records) => {
      this.propositions = records;
    })
  }

}
