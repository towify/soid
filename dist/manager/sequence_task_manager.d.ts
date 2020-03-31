export declare class SequenceTaskManager {
    #private;
    constructor();
    addTask(task: () => void): this;
    run(): void;
    private _run;
}
