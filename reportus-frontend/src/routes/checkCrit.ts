import { ALERT_MATRICE } from "../config/alarmMatrices";

interface assetObject {
  asset: string;
  priority: string;
}

export const checkCriticality = (category: string, severity: string) => {
  const lowerCase = severity.toLowerCase();

  var column;
  var row;

  switch (category) {
    case "info":
      row = 0;
      break;
    case "warning":
      row = 1;
      break;
    case "critical":
      row = 2;
      break;

    default:
      row = 0;
      break;
  }

  switch (lowerCase) {
    case "low":
      column = 0;
      break;

    case "medium":
      column = 1;
      break;

    case "high":
      column = 2;
      break;
    case "critical":
      column = 3;
      break;

    default:
      column = 1;
      break;
  }

  const reevalPrio = ALERT_MATRICE[row][column];

  return reevalPrio;
};

/* const findAsset = (assetList: Array<assetObject>, targetAsset: string) => {

    for (let i = 0; i < assetList.length; i++) {
    
        if (assetList[i].asset === targetAsset) {
            return assetList[i].priority
        }

        
        
    }
return "Not Found"
}
export const checkCriticality =  (level: string, asset: string, assetList: Array<assetObject>) => {


    var column 
    var row

    switch (level) {
            case "CRITICAL":
                row = 0
                break;
            case "HIGH":
                row = 1
                break;
            case "MEDIUM":
                row = 2
                break;
            case "LOW":
                row = 3
                break;
        
            default:
                row = 2
                break
                
        }

        var assetPrio = findAsset(assetList, asset)

        if (assetPrio != "Not Found") {

            switch (assetPrio) {
                case "CRITICAL": 
            column = 0
            break;
            
            case "HOCH": 
            column = 1
            break;
            
            case "MEDIUM": 
            column = 2
            break;
            
            
            default:
                column = 2 
                break; 
            }

        } else return assetPrio


        const reevalPrio = MITRE[row][column]

        return reevalPrio }*/
