/*
 * @author kaysaith
 * @date 2020/3/29 21:53
 */

export class SequenceTaskManager {
  readonly #tasks: (() => void)[] = [];
  #isRunning = false;

  constructor() {}

  public addTask(task: () => void) {
    this.#tasks.push(task);
    return this;
  }

  public run() {
    if (this.#isRunning) return;
    this.#isRunning = true;
    this._run();
  }

  private _run() {
    (async () => {
      if (!this.#tasks.length) {
        this.#isRunning = false;
        return;
      }
      await this.#tasks[0]();
      this.#tasks.splice(0, 1);
      this._run();
    })();
  }
}