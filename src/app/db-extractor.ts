export class DbExtractor {

}

export class ProgressBarObj {
    stepTwoProgBarValue:number;
  stepThreeProgBarValue:number;
}

export class ProcessDetails{
id:string
createdAt:number
updatedAt:number
process:string
supportedOutputFormats:string[]=[]
includeTableRelationship:boolean
softDeleted:boolean
}

export class ProcessDetailsObj{
process:string="0"
outputFormat:string="0"
tableIncRule:string
includeTableRelationship:boolean=false
xmlSplitFileSize:number=100;
maxParallelProcess:number=3
incTable:boolean=false
incView:boolean=false
xmlXDBCompability:boolean=false
extractLOBWithXML:boolean=false
incRecordCount:boolean=false
}
