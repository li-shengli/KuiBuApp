export class TaskInfo {
    taskId: string;
    username: string;
    taskName: string;
    taskType: string;
    taskStatus: string;
    taskFrom: number;
    priority: number;
    createTime: Date;
    startTime: Date;
    endDate: Date;
    lastUpdateDate: Date;

    pagesIntotal: number;
    pagesCurrent: number;
    expectedDays: number;
    history: Map<number, number>;

    toString(){
        return this.taskId + this.taskName + this.taskType;
    }
}