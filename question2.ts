class Question2 {
    static numAry: number[][] = [
        [1, 0, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0],
    ];

    static visited: boolean[][] = Array.from({ length: 4 }, () => Array(5).fill(false));
    // 하, 우, 좌, 상, 오른쪽 아래 대각선, 왼쪽 아래 대각선, 오른쪽 위 대각선, 왼쪽 위 대각선 순서로 탐색 하였습니다.
    static dx: number[] = [0, 1, -1, 0, 1, -1, 1, -1];
    static dy: number[] = [1, 0, 0, -1, 1, 1, -1, -1];
    static count: number = 0;

    public static main(): void {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                if (!this.visited[i][j] && this.numAry[i][j] === 1) {
                    this.count++;
                    this.visited[i][j] = true;
                    this.DFS(i, j);
                }
            }
        }
        console.log(`result: ${this.count}`);

    }

    static DFS(i: number, j: number) : void {
        for (let k = 0; k < 8; k++) {
            let x : number = i + this.dx[k];
            let y : number  = j + this.dy[k];
            if (x >= 0 && y >= 0 && x < 4 && y < 5) {
                if (!this.visited[x][y] && this.numAry[x][y] === 1) {
                    this.visited[x][y] = true;
                    this.DFS(x, y);
                }
            }
        }
    }
}

Question2.main();