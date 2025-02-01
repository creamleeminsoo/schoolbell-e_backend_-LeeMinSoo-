## 📑 풀이 과정

1, [문제 1](#문제-1)

2, [문제 2](#문제-2)


## :walking: 문제 1


  ### 🎨 문제 분석
 - 1,3,5,7,9를 한번씩 사용해 만든 2개의 수를 곱한 최대값을 구해야 하므로, **주어진 숫자의 모든 가능한 순열**을 생성하고, 각 **순열을 2개의 수**로 나눠
   
   그중 **최대 값을 완전 탐색으로 계속 업데이트** 해야겠다고 생각 했습니다.

  ### 🎨 알고리즘 선택
 - 모든 경우의수의 순열을 생성해야 하므로 **백트래킹** 알고리즘을 사용하였고,

 - O(n!) 시간복잡도를 가지는 알고리즘 이지만 문제의 **n이 5이며**, **중복된 숫자는 없어야 하고**, **완전 탐색을 해야 하므로** 적절하다 생각했습니다.

  ### 🎨 구현

 - 순열을 생성하기 위해 재귀함수 `permute`를 사용하였고 방문배열 `visited`를 활용해 **중복된 값이 없게 순열을 생성**하였습니다.

 - 순열의 크기가 5일시 `checkMaxProduct`함수를 호출해 
   순열의 첫번째 부분과 두번째 부분으로 나눠 각각 `arrayToNumber` 함수를 통해 숫자로 변환하고 곱을 계산 한뒤, 
   
   최대곱을 업데이트하고 해당 숫자 조합을 `maxProductPair`에 저장 했습니다.
 
 - 120개의 순열에서 480개의 조합을 `완전탐색`하여 최대값 조합을 출력 하였습니다.

 


## :walking: 문제 2

 ### 🎨 자료구조 선택
  
  - 문제를 확인 한 뒤, **여러 방향**을 움직여야 한다고 생각이 들었기에 인덱스를 통해 **O(1) 탐색 시간복잡도를 가진 2차원 배열으로 선택** 하였고,

  - `Land`는 1 `Sea`는 0 으로 저장 했습니다.
 
  -  이미 방문한 곳을 다시 탐색하지 않도록 `Boolean`타입의 2차원 `visited`배열 또한 선언했습니다.

   ### 🎨 알고리즘 선택

  
  - 연결된 `Land`를 찾아야 하므로 `DFS`또는 `BFS`를 통해 해결이 가능하다 생각 들었으며,
 
    
  - 연결된 `Land`를 끝까지 탐색해야 하므로 DFS와 BFS의 시간복잡도는 비슷하다 느껴서 조금더 가독성이 좋은 재귀형태인 **DFS를 선택 하였습니다.**

  ### 🎨 탐색 순서

  - **하, 우, 좌, 상, 오른쪽 아래 대각선, 왼쪽 아래 대각선,  오른쪽 위 대각선, 왼쪽 위 대각선 순서**로 탐색순서를 지정 하였습니다.
 
 
  
