export class DbExtractor {

}

export class ProgressBarObj {
  stepTwoProgBarValue: number;
  stepThreeProgBarValue: number;
}

export class ProcessDetails {
  id: string;
  createdAt: number;
  updatedAt: number;
  process: string;
  supportedOutputFormats: string[] = [];
  includeTableRelationship: boolean;
  softDeleted: boolean;
}

export class ProcessDetailsObj {
  process: string = null;
  outputFormat: string = null;
  tableIncRule = '';
  includeTableRelationship = false;
  xmlSplitFileSize = 100;
  maxParallelProcess = 3;
  incTable = false;
  incView = false;
  xmlXDBCompability = false;
  extractLOBWithXML = false;
  incRecordCount = false;
  ExecuteQueryObj: ExecuteQueryObj = new ExecuteQueryObj();
}

export class ExecuteQueryObj {
  queryTitle = '';
  query = '';
  isQueryFile = false;
  queryFileToUpload: File = null;
  queryFileName = '';
}
