export class DateUtility {
    public DateUtility(){};

    static daySinceStart(startTime: Date) {
       var d: number = (Date.now() - startTime.getMilliseconds())/(24*60*60*1000);
    }
}