import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IngestionDataConfig } from '../ert-landing-page/ert';
import { ErtService } from '../ert-landing-page/ert.service';
import { CommonUtilityService } from '../common-utility.service';

@Component({
  selector: 'app-ert-extract-digest',
  templateUrl: './ert-extract-digest.component.html',
  styleUrls: ['./ert-extract-digest.component.css']
})
export class ErtExtractDigestComponent implements OnInit {
  ingestionDataConfigObj: IngestionDataConfig = new IngestionDataConfig();
  constructor(public router: Router, private commonUtilityService: CommonUtilityService,
    private ertService: ErtService, public activatedRoute: ActivatedRoute) { }
  ertJobId = '';
  disableIngestData = false;
  xmlSplitFileSize = '100';

  ngOnInit() {
    if (this.commonUtilityService.checkPropertiesHasValue(this.ertService.ingestionDataConfig)) {
      this.ingestionDataConfigObj = this.ertService.ingestionDataConfig;
      this.disableIngestData = false;
      const a = document.getElementById('ingest-checkbox') as HTMLInputElement;
      a.checked = true;
    }
    if (this.ertService.xmlSplitSize !== '100') {
      const a = document.getElementById('extract-checkbox') as HTMLInputElement;
      a.checked = true;
      this.disableIngestData = false;
    }
  }

  gotoTableExtraction() {
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.router.navigate(['/workspace/ert/ert-table/', this.ertJobId]);
    } else {
      this.router.navigate(['workspace/ert/ert-table']);
    }
  }
  gotoTableColConfig() {
    this.ertService.setIngestionDataConfig(this.ingestionDataConfigObj);
    this.router.navigate(['workspace/ert/ert-table-col-config']);
  }
  saveIngestData(event) {
    if (event.target.value) {
      this.disableIngestData = false;
    } else {
      this.disableIngestData = true;
    }
  }
  setXMLFileSplitSize(xmlSliderObj: any) {
    this.xmlSplitFileSize = xmlSliderObj.newValue;
    this.ertService.setXmlSplitSize(this.xmlSplitFileSize.toString());
  }
}

