class Question1{
    static numAry: number[] = [1,3,5,7,9];
    static maxProductValue: number =0;
    static maxProductPair: string ="";
    public static main(): void{
        let permutation: number[] = new Array(5);
        let visited : boolean[] = [false,false,false,false,false];
        this.permute(permutation,visited,0);
        console.log(`result: ${this.maxProductPair}`);

    }
    static permute(permutation: number[],visited: boolean[], depth:number) : void{
        if(depth === 5){
            this.checkMaxProduct(permutation);
            return;
        }
        for(let i=0;i<5;i++){
            if(!visited[i]){
                visited[i] = true;
                permutation[depth] = this.numAry[i];
                this.permute(permutation,visited,depth+1);
                visited[i] = false; 
            }
        }

    }
    static checkMaxProduct(permutation: number[]) : void{
        for(let i=1;i<5;i++){
            let num1 : number = this.arrayToNumber(permutation.slice(0,i));
            let num2 : number = this.arrayToNumber(permutation.slice(i,5));
            let product : number = num1*num2;
            
            if(product>this.maxProductValue){
                this.maxProductValue = product;
                this.maxProductPair = `${num1} , ${num2}`;
            }
        }
    }
    static arrayToNumber(ary: number[]):number{
        let num : number = 0;
        for(let i=0;i<ary.length;i++){
            num = num*10+ary[i];
        }
        return num;
    }
}

Question1.main();