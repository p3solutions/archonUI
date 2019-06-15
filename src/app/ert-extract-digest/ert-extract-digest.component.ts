import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IngestionDataConfig, ExtractDataConfigInfo } from '../ert-landing-page/ert';
import { ErtService } from '../ert-landing-page/ert.service';
import { CommonUtilityService } from '../common-utility.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ert-extract-digest',
  templateUrl: './ert-extract-digest.component.html',
  styleUrls: ['./ert-extract-digest.component.css']
})
export class ErtExtractDigestComponent implements OnInit {
  ingestionDataConfigObj: IngestionDataConfig = new IngestionDataConfig();
  isDisabledSaveBtn = false;
  constructor(public router: Router, private commonUtilityService: CommonUtilityService, private spinner: NgxSpinnerService,
    private ertService: ErtService, public activatedRoute: ActivatedRoute) { }
  ertJobId = '';
  disableIngestData = true;
  from = '';
  extractDataConfigInfo: ExtractDataConfigInfo = new ExtractDataConfigInfo();
  ngOnInit() {
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    if (this.from === 'data-record' || this.from === 'SIP') {
      this.isDisabledSaveBtn = true;
    }
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.ertService.extractDataConfigInfo.titleName !== '' || this.ertService.extractDataConfigInfo.holdingName !== ''
      || this.ertService.extractDataConfigInfo.applicationName !== '' || this.ertService.ingestionDataConfig.infoArchiveName !== '') {
      this.getExtractAndIngestInfoFromService();
    } else if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.getExtractAndIngestInfo();
    } else {
      this.initFunction();
    }
  }

  getExtractAndIngestInfoFromService() {
    this.extractDataConfigInfo = this.ertService.extractDataConfigInfo;
    const a = document.getElementById('extract-checkbox') as HTMLInputElement;
    a.checked = true;
    if (this.ertService.ingestionDataConfig.infoArchiveName !== '') {
      this.ingestionDataConfigObj = new IngestionDataConfig();
      this.ingestionDataConfigObj = this.ertService.ingestionDataConfig;
      this.disableIngestData = false;
      const b = document.getElementById('ingest-checkbox') as HTMLInputElement;
      b.checked = true;
    }
    this.isDisabledSaveBtn = false;
  }

  getExtractAndIngestInfo() {
    this.spinner.show();
    this.ertService.getExtractConfig(this.ertJobId).subscribe(result => {
      try {
        this.spinner.hide();
        this.extractDataConfigInfo = result.extractDataConfig;
        const b = document.getElementById('extract-checkbox') as HTMLInputElement;
        b.checked = true;
        if (result.ingestionDataConfig !== null) {
          const a = document.getElementById('ingest-checkbox') as HTMLInputElement;
          a.checked = true;
          this.ingestionDataConfigObj = result.ingestionDataConfig;
          this.disableIngestData = false;
        }
        this.isDisabledSaveBtn = false;
      } catch {
        this.spinner.hide();
      }
    });
  }



  initFunction() {
    const markCheck = document.getElementById('extract-checkbox') as HTMLInputElement;
    markCheck.checked = true;
    if (this.ertService.ingestionDataConfig.infoArchiveName !== '') {
      this.ingestionDataConfigObj = this.ertService.ingestionDataConfig;
      this.disableIngestData = false;
      const a = document.getElementById('ingest-checkbox') as HTMLInputElement;
      a.checked = true;
    }
    if (this.ertService.extractDataConfigInfo.titleName !== '' ||
      this.ertService.extractDataConfigInfo.xmlFileSplitSize !== '100') {
      this.extractDataConfigInfo = this.ertService.extractDataConfigInfo;
      const a = document.getElementById('extract-checkbox') as HTMLInputElement;
      a.checked = true;
    }
    if (this.ertService.extractDataConfigInfo.titleName !== '' || this.ertService.extractDataConfigInfo.applicationName !== '' ||
      this.ertService.extractDataConfigInfo.xmlFileSplitSize !== '100') {
      this.extractDataConfigInfo = this.ertService.extractDataConfigInfo;
      const a = document.getElementById('extract-checkbox') as HTMLInputElement;
      a.checked = true;
    }
    if (this.from === 'data-record' || this.from === 'SIP') {
      if (this.toEnableBtn()) {
        this.toEnableIngestBtn();
      }
    }
  }

  gotoTableExtraction() {
    this.navigateToUrl('/workspace/ert/ert-table');
  }
  gotoTableColConfig() {
    this.ertService.setXmlSplitSize(this.extractDataConfigInfo);
    this.ertService.setIngestionDataConfig(this.ingestionDataConfigObj);
    this.navigateToUrl('/workspace/ert/ert-table-col-config');
  }

  navigateToUrl(url: string) {
    if (this.from === 'data-record' || this.from === 'SIP') {
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate([url + '/', this.ertJobId], { queryParams: { from: this.from } });
      } else {
        this.router.navigate([url + '/'], { queryParams: { from: this.from } });
      }
    } else
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate([url + '/', this.ertJobId], { queryParams: { from: this.from } });
      } else {
        this.router.navigate([url]);
      }
  }

  saveIngestData(event) {
    if (event.target.checked) {
      this.disableIngestData = false;
      this.isDisabledSaveBtn = true;
    } else {
      this.disableIngestData = true;
      this.isDisabledSaveBtn = false;
      this.ingestionDataConfigObj = new IngestionDataConfig();
    }
    if (!this.toEnableBtn()) {
      this.toEnableIngestBtn();
    }
  }

  checkToEnableBtn() {
    if (!this.toEnableBtn()) {
      this.toEnableIngestBtn();
    }
  }
  space(event) {
    if (event.which === 32) {
      return false;
    }
  }

  toEnableBtn() {
    if (this.from === 'data-record') {
      if (this.extractDataConfigInfo.titleName !== '') {
        this.isDisabledSaveBtn = false;
      } else {
        this.isDisabledSaveBtn = true;
      }
    }
    if (this.from === 'SIP') {
      if (this.extractDataConfigInfo.applicationName !== '' &&
        this.extractDataConfigInfo.holdingName !== '' && this.from === 'SIP') {
        this.isDisabledSaveBtn = false;
      } else {
        this.isDisabledSaveBtn = true;
      }
    }
    if (this.from !== 'SIP' && this.from !== 'data-record') {
      this.isDisabledSaveBtn = false;
    }
    return this.isDisabledSaveBtn;
  }

  toEnableIngestBtn() {
    if (!this.disableIngestData) {
      if (this.ingestionDataConfigObj.infoArchiveName !== '' && this.ingestionDataConfigObj.infoArchivePassword !== ''
        && this.ingestionDataConfigObj.infoArchiveSchemaName !== '' && this.ingestionDataConfigObj.infoArchiveUserName !== '') {
        this.isDisabledSaveBtn = false;
      } else {
        this.isDisabledSaveBtn = true;
      }
    }
  }


  setXMLFileSplitSize(xmlSliderObj: any) {
    this.extractDataConfigInfo.xmlFileSplitSize = xmlSliderObj.newValue;
  }
  cancel() {
    this.router.navigate(['/workspace/ert/ert-jobs']);
  }
}

