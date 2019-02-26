import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IngestionDataConfig, ExtractDataConfigInfo } from '../ert-landing-page/ert';
import { ErtService } from '../ert-landing-page/ert.service';
import { CommonUtilityService } from '../common-utility.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ert-extract-digest',
  templateUrl: './ert-extract-digest.component.html',
  styleUrls: ['./ert-extract-digest.component.css']
})
export class ErtExtractDigestComponent implements OnInit {
  ingestionDataConfigObj: IngestionDataConfig = new IngestionDataConfig();
  isDisabledSaveBtn = false;
  constructor(public router: Router, private commonUtilityService: CommonUtilityService,
    private ertService: ErtService, public activatedRoute: ActivatedRoute) { }
  ertJobId = '';
  disableIngestData = true;
  from = '';
  extractDataConfigInfo: ExtractDataConfigInfo = new ExtractDataConfigInfo();
  ngOnInit() {
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    if (this.from === 'data-record') {
      this.isDisabledSaveBtn = true;
    }
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.ertService.getExtractConfig(this.ertJobId).subscribe(result => {
        this.extractDataConfigInfo = result.extractDataConfig;
        if (result.ingestionDataConfig !== null) {
          this.ingestionDataConfigObj = result.ingestionDataConfig;
        }
        this.isDisabledSaveBtn = false;
      });
    } else {
      this.initFunction();
    }
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
    if (this.extractDataConfigInfo.titleName === '' && this.from !== 'data-record') {
      this.isDisabledSaveBtn = false;
    } else if (this.extractDataConfigInfo.titleName !== '' && this.from === 'data-record') {
      this.isDisabledSaveBtn = false;
    } else {
      this.isDisabledSaveBtn = true;
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
    if (this.from === 'data-record') {
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate([url + '/', this.ertJobId], { queryParams: { from: this.from } });
      } else {
        this.router.navigate([url + '/'], { queryParams: { from: this.from } });
      }
    } else
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate([url, this.ertJobId]);
      } else {
        this.router.navigate([url]);
      }
  }

  saveIngestData(event) {
    if (event.target.checked) {
      this.disableIngestData = false;
      this.isDisabledSaveBtn = true;
      this.toEnableBtn();
    } else {
      this.disableIngestData = true;
      this.isDisabledSaveBtn = false;
    }
  }
  toEnableBtn() {
    if (this.extractDataConfigInfo.titleName !== '') {
      this.isDisabledSaveBtn = false;
    } else if (!this.disableIngestData) {
      if (this.ingestionDataConfigObj.infoArchiveName !== '' && this.ingestionDataConfigObj.infoArchivePassword !== ''
        && this.ingestionDataConfigObj.infoArchiveSchemaName !== '' && this.ingestionDataConfigObj.infoArchiveUserName !== '') {
        this.isDisabledSaveBtn = false;
      } else {
        this.isDisabledSaveBtn = true;
      }
    } else {
      this.isDisabledSaveBtn = true;
    }
  }

  setXMLFileSplitSize(xmlSliderObj: any) {
    this.extractDataConfigInfo.xmlFileSplitSize = xmlSliderObj.newValue;
  }
  cancel() {
    this.router.navigate(['/workspace/ert/ert-jobs']);
  }
}

