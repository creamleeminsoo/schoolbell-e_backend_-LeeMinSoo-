## 📑 풀이 과정

1. [문제 1](#문제-1)  
2. [문제 2](#문제-2)
3. [문제 3](#문제-3)

<a id="문제-1"></a>
## :walking: 문제 1


  ### 🎨 문제 분석
1,3,5,7,9를 한번씩 사용해 만든 2개의 수를 곱한 최대값을 구해야 하므로, **주어진 숫자의 모든 가능한 순열**을 생성하고,
 
각 **순열을 2개의 수**로 나눠 그중 **최대 값을 완전 탐색으로 계속 업데이트** 해야겠다고 생각 했습니다.

  ### 🎨 알고리즘 선택
 - 모든 경우의수의 순열을 생성해야 하므로 **백트래킹** 알고리즘을 사용하였고,

 - O(n!) 시간복잡도를 가지는 알고리즘 이지만 문제의 **n이 5이며**, **중복된 숫자는 없어야 하고**, **완전 탐색을 해야 하므로** 적절하다 생각했습니다.

  ### 🎨 구현

 - 순열을 생성하기 위해 재귀함수 `permute`를 사용하였고 방문배열 `visited`를 활용해 **중복된 값이 없게 순열을 생성**하였습니다.

 - 순열의 크기가 5일시 `checkMaxProduct`함수를 호출해 
   순열의 첫번째 부분과 두번째 부분으로 나눠 각각 `arrayToNumber` 함수를 통해 숫자로 변환하고 곱을 계산 한뒤, 
   
   최대곱을 업데이트하고 해당 숫자 조합을 `maxProductPair`에 저장 했습니다.
 
 - 120개의 순열에서 480개의 조합을 `완전탐색`하여 최대값 조합을 출력 하였습니다.

 

<a id="문제-2"></a>
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
 

<a id="문제-3"></a>
## :walking: 문제 3

## :blue_book: 문제 3 - 1) DB 설계

### ERD

![erd](https://github.com/user-attachments/assets/f5eebb63-9c27-4283-bd13-cfad2d0642b5)



### ERD 설계 개요

**문서(document)**, **결재(approval)**, **유저(user)** 테이블을 정의하고, 각 테이블 간 최소한의 관계를 설정하였습니다.

- **문서 (1) : 결재 (N)** → 하나의 문서는 여러 개의 결재 단계를 가질 수 있습니다.

- **유저 (1) : 결재 (N)** → 한 명의 유저는 여러 개의 결재 요청을 승인하거나 반려할 수 있습니다.

- **유저 (1) : 문서 (N)** → 한 명의 유저는 여러 개의 문서를 생성할 수 있습니다.

또한, **결재 상태(approval_status)**, **결재 단계(approval_step)**, **결재 권한(auth_level)** 과 같은 도메인 값을 

`CHAR(1)` 타입으로 저장하도록 설계하였습니다.

 - `CHAR(1)` 타입을 사용하면 직관적인 값 저장이 가능하며,

 - 새로운 권한 레벨을 추가하거나 변경할 때 `ENUM` 타입보다 유연하게 변경 가능하다는 장점이 있었습니다.

 - 또한 `MySQL` 8.0.16 버젼 부터 **CHECK 제약조건을** 통해 트리거 등이 없이 도메인 무결성을 지킬수 있었습니다.

### :books: 결재 프로세스

1, **문서 생성**

 - 새로운 `document`가 생성될 때, `approval` 테이블에도 초기 결재 정보가 함께 삽입
   
 - `approval_status = 0` (대기), `approval_step = 1` (최초 단계), `approver_id = NULL`
   
 - 모든 작업은 **하나의 트랜잭션** 으로 처리

2, **권한1 결재 승인**

 - `approval_status = '1'` (승인), `approver_id = 권한 1 (user_id)`로 업데이트.
   
 - 다음 결재 단계를 위해 `approval_step = 2`, `approval_status = 0` (대기), `approver_id = NULL`인 새로운 결재 레코드 삽입.
   
 - `document_status = 1` (진행 중)으로 변경

2-1, **권한1 결재 반려**

 - `approval_status = '2'` (반려), `approver_id = 권한 1` (user_id)로 업데이트.
   
 - 문서 진행이 중단되며, `document_status = 3` (반려됨)으로 변경.

3, **권한 2 결재 승인**

 - `approval_status = '1'` (승인), `approver_id = 권한 2(user_id)`로 업데이트.
   
 - 다음 결재 단계를 위해 `approval_step = 3`, approval_status = 0` (대기), `approver_id = NULL`인 새로운 결재 레코드 삽입

3-1, **권한 2 결재 반려**

 - `approval_status = '2'` (반려), `approver_id = 권한2(user_id)`로 업데이트.
   
 - 문서 진행이 중단되며, `document_status = 3` (반려됨)으로 변경.

4, **최종 결재자 결재 승인**

 - approval_status = '1' (승인), `approver_id = 최종 결재자(user_id)`로 업데이트.

 - 모든 결재가 완료되었으므로, `document_status = 2` (승인됨)으로 변경.

4-1, **최종 결재자 결재 반려**

 - `approval_status = '2'` (반려), `approver_id = 최종 결재자(user_id)`로 업데이트.

 -  문서 진행이 중단되며, `document_status = 3` (반려됨)으로 변경.


</br>
</br>
</br>

추적성과 이력 관리의 중요성을 고려하여, 

**각 결재 단계를 동일한 ROW에서 업데이트하는 방식이 아니라**, **결재 단계마다 새로운 ROW를 삽입하는 방식을 선택하였습니다**.




</br>
</br>
</br>



## :blue_book: 문제 3 - 2) 특정 사용자가 처리 해야 할 결재 건을 나열 하는 query

### :low_brightness: 테스트 환경

- `Docker MySQL 컨테이너`에서 테스트를 진행 했습니다.

- 프로시저를 통해 1000명의 `user` 5000개의 `document` 5000개의 `approval` 더미 데이터를 추가 한뒤 테스트를 진행했습니다.


### 쿼리 설명 

1. 특정 사용자의 권한을 확인하기 위해 서브쿼리를 사용했습니다.

    ```sql
    SELECT auth_level FROM user WHERE user_id = 13
    ```

2. `결재 상태(approval_status)`가 '대기(0)'인 `approval` 레코드를 조회하며, 특정 사용자의 권한(`auth_level`)과 결재 단계(`approval_step`)가 일치하는 행을 검색하는 쿼리입니다.

    ```sql
    WHERE appr.approval_step = (SELECT auth_level FROM user WHERE user_id = 13)
    AND appr.approval_status = '0'
    ```

3. 문서 제목과 문서 작성일자 또한 조회하기 위해 `문서(document)`와 `결재(approval)`을 JOIN했습니다.

    ```sql
    FROM approval appr
    JOIN document doc ON appr.document_id = doc.document_id
    ```

4. 문서 작성일자를 기준으로 오름차순 정렬했습니다.

    ```sql
    ORDER BY appr.approval_at ASC;
    ```


### 문제점

![원래 쿼리 실행계획](https://github.com/user-attachments/assets/1d366fee-f82e-45d8-bb0a-4d104d9f8125)

'Using temporary', 'Using file sort'가 발생해 'FULL TABLE SCAN'을 하였습니다.

문제점을 확인해보니 조인에서 사용하는 **드라이빙 테이블**이 `approval` 테이블에서 작용해서 생긴 문제점 이라고 판단되어

문서 작성일자가 아닌 **결재 요청 일자(approval_at)로 오름차순 정렬** 하였고,

결과적으로 'Using temporary' 문제를 해결 했습니다.

또한 'Using filesort'를 해결하기위해 인덱스를 이용한 정렬을 활용하기로 결정하였고

`결재 단계(approval_step)`, `결재 상태(approval_status)`, `결재 요청 일자(approval_at)` **3개의 컬럼으로 조합한 복합 인덱스를 설계 한뒤**

실행 계획을 확인하니 의도 한 대로 **인덱스를 통해 검색하고**, **인덱스를 통해 정렬** 하였습니다.

![복합 인덱스로 최적화](https://github.com/user-attachments/assets/6c8a4970-6e84-433c-8007-a2b1dcf24d06)


### 결과

![결과](https://github.com/user-attachments/assets/62628cfa-c3d0-4524-b1d4-b7bbd6bc357a)



특정 사용자(user_id = 13) 이 처리해야할 결재건을 검색 하였습니다.
