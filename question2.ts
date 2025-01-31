class Question2 {
    static A: number[][] = [
        [1, 0, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0],
    ];

    static visited: boolean[][] = Array.from({ length: 4 }, () => Array(5).fill(false));
    static dx: number[] = [0, 1, -1, 0, 1, -1, 1, -1]; // 하우좌상 + 오른쪽 대각선 + 왼쪽대각선 + 오른쪽위 대각선, 왼쪽 위 대각선
    static dy: number[] = [1, 0, 0, -1, 1, 1, -1, -1];
    static count: number = 0;

    public static main(): void {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                if (!this.visited[i][j] && this.A[i][j] === 1) {
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
            const x = i + this.dx[k];
            const y = j + this.dy[k];
            if (x >= 0 && y >= 0 && x < 4 && y < 5) {
                if (!this.visited[x][y] && this.A[x][y] === 1) {
                    this.visited[x][y] = true;
                    this.DFS(x, y);
                }
            }
        }
    }
}

Question2.main();