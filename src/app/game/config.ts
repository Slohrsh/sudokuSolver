export class Config {

  private static INSTANCE: Config;

  sleepTime = 800;

  defaultGrid: number[][] = [
    [0, 0, 0, 6, 8, 0, 1, 9, 0],
    [2, 6, 0, 0, 7, 0, 0, 0, 4],
    [7, 0, 1, 0, 9, 0, 5, 0, 0],
    [8, 2, 0, 0, 0, 4, 0, 5, 0],
    [1, 0, 0, 6, 0, 2, 0, 0, 3],
    [0, 4, 0, 9, 0, 0, 0, 2, 8],
    [0, 0, 9, 0, 4, 0, 7, 0, 3],
    [3, 0, 0, 0, 5, 0, 0, 1, 8],
    [0, 7, 4, 0, 3, 6, 0, 0, 0]
  ];

  /*defaultGrid: number[][] = [
    [0, 0, 0, 0, 8, 0, 6, 0, 2],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
    [2, 0, 0, 0, 9, 0, 5, 0, 0],
    [0, 7, 0, 0, 0, 0, 0, 0, 0],
    [0, 6, 0, 9, 0, 1, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 5, 0, 9, 0, 0, 0, 6],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [6, 0, 3, 0, 7, 0, 0, 0, 0]
  ];*/


  private constructor() { }

  public static getInstance(): Config {
    if (!this.INSTANCE) {
      this.INSTANCE = new Config();
    }
    return this.INSTANCE;
  }
}
