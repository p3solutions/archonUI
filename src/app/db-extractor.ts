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
}
