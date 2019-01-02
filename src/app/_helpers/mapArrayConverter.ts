export class MapArrayConverter {
    public MapArrayConverter(){};

    static toArray(history: Map<number, number>) {
        console.log(history);
        var historyArray = [];
        history.forEach((value:number, key:number) =>{
            historyArray.push([key, value]);
        })

        console.log("historyArray: "+historyArray);
        return historyArray;
    }

    static toMap(historyArray: any[]) {
        if (historyArray == null) {
            historyArray = [];
        }
        console.log(historyArray);
        var history:Map<number, number> = new Map();

        historyArray.forEach(function (item) {
            history.set(item[0], item[1]);
        }); 

        return history;
    }
}