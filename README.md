# MINIPROJECT_PARKSHOT
부산대학교 SW개발자 양성과정 8회차 7조 미니프로젝트입니다.
## :golf:프로젝트 소개
* MINIPROJECT_PARKSHOT은 전국 파크골퍼들에게 골프장과 예약서비스를 제공합니다.

## :computer: 기술 스택
- 프론트엔드 : <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
- 백엔드 : <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"><img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
- 데이터베이스 : <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
- 기타 :  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## :rocket: 개발자 소개
- FE : 이가람&nbsp;https://github.com/rraamm8
- BE : 정원영&nbsp;https://github.com/wonny725

## :bulb: 주요 기능

### :ledger: 회원가입 및 로그인

#### 회원가입
- **필수 입력 항목**: 이메일, 비밀번호, 닉네임
- **중복 확인**:
  - 이메일 중복 여부 확인 (서버 요청: `/member/checkUsername`)
  - 닉네임 중복 여부 확인 (서버 요청: `/member/checkNickname`)
- **비밀번호 유효성 검사**:
  - 입력 비밀번호와 확인 비밀번호가 일치해야 함
- **서버 요청 (POST)**: `/member/register`
  - **요청 데이터**: `username`, `password`, `nickname`
  - 응답 결과에 따른 성공/실패 알림

#### 로그인
- **필수 입력 항목**: 이메일, 비밀번호
- **JWT 토큰 처리**:
  - 서버로부터 JWT 토큰 수신 (Authorization 헤더)
  - 로컬 스토리지에 토큰 저장 (키: `authToken`)
- **서버 요청 (POST)**: `/login`
  - **요청 데이터**: `username`, `password`
  - 인증 성공 시 사용자 정보 저장 (키: `username`)

#### OAuth 로그인
- 네이버, 카카오, 구글 연동 로그인
- 각 플랫폼의 OAuth URL로 이동하여 인증
- 인증 후 서버에서 토큰 수신 및 사용자 정보 저장
  - **요청 URL**: `/oauth2/authorization/{provider}`
  - **결과 처리 페이지**: `/oauth-redirect`

<img src="./Images/회원가입.gif" alt="회원가입" width="300">
<img src="./Images/로그인.gif" alt="로그인" width="300">

---

### :golf: 파크골프장 찾기 및 :round_pushpin: 네이버지도 구현

#### 골프장 검색
- 사용자가 골프장 이름, 지역, 주소를 입력하여 검색
- 검색된 골프장의 정보와 위치를 결과로 표시
- 입력된 검색어를 기반으로 정규화된 데이터에서 검색
- 검색 결과를 클릭하면 해당 골프장의 위치로 지도 이동

#### 지도 및 마커 표시
- 네이버 지도 API를 활용하여 지도 렌더링
- 골프장 데이터를 기반으로 마커 표시
- 마커 클릭 시 골프장 이름 및 예약 버튼 표시

#### 검색어 기반의 네비게이션 기능
- **URL 파라미터(query)를 통한 검색 초기화**:
  - 사용자가 검색창에 입력한 검색어를 URL의 `query` 파라미터로 전달
  - 페이지가 로드될 때 URL의 `query` 값을 읽어와 검색어 상태에 반영하고, 해당 검색어로 자동 검색 실행
- **네비게이션을 활용한 동적 페이지 이동**:
  - 검색 결과 목록에서 특정 골프장을 선택 시, 해당 골프장의 ID를 포함한 URL로 네비게이션
  - 예: `/reserve/{courseId}`로 이동하여 선택된 골프장 정보를 다음 페이지에서 활용
- **직관적인 사용자 경험 제공**:
  - 검색 결과를 클릭하면, 자동으로 해당 위치로 지도를 이동하여 시각적으로 확인 가능
  - 예약 버튼 클릭 시 골프장 정보를 전달하며 예약 페이지로 연결

#### 예약 기능 연동
- 검색 결과에서 "예약하기" 버튼 클릭 시 예약 페이지로 이동
- 골프장의 고유 ID(`courseId`)를 URL에 전달

#### 지오코딩 (GPS 변환)
- 골프장 주소를 기반으로 지오코딩을 수행하여 위도와 경도 획득
- 지오코딩 실패 시 오류 처리

<img src="./Images/검색.gif" alt="검색" width="300">
<img src="./Images/지도.GIF" alt="지도" width="300">

---

### :pushpin: 골프장 예약하기

#### 골프장 검색
- 사용자가 검색창에 골프장 이름, 주소, 지역을 입력하여 골프장 데이터를 검색
- 검색된 결과를 카드 형태로 화면에 표시
- 검색 결과가 없을 경우 "검색된 결과가 없습니다." 메시지 출력

#### 골프장 선택 및 이미지 보기
- 검색 결과에서 특정 골프장을 선택하면 해당 골프장의 상세 정보와 이미지 캐러셀 표시
- 이미지는 서버에서 제공하며 각 골프장별 고유 이미지 파일로 매핑

#### 날짜 선택
- 사용자가 예약 날짜를 캘린더(Calendar) 컴포넌트를 통해 선택
- 날짜 선택 시 예약 가능한 시간대를 동적으로 표시

#### 시간 선택
- 사용자가 선택한 날짜에 따른 예약 가능한 시간대를 표시
- 시간 선택 시 예약 버튼이 활성화되며 예약 가능한 상태로 전환

#### 예약 기능
- 사용자가 선택한 골프장, 날짜, 시간, 사용자 정보를 기반으로 예약 요청을 서버에 전달
- 예약 성공 시 "예약 성공!" 메시지 출력, 실패 시 오류 메시지 표시

#### 리스트 복원 및 검색 초기화
- 사용자가 "전체 리스트로 돌아가기" 버튼을 클릭하면 검색된 골프장 리스트를 초기화
- 이전 검색 상태 및 선택된 예약 정보는 모두 초기화

<img src="./Images/예약하기.GIF" alt="예약하기" width="300">

---

#### :memo: 스코어보드

#### 골프장 검색
- 사용자가 검색창에 골프장 이름, 주소, 지역 입력 후 검색 버튼 클릭
- 검색 결과를 목록 형태로 화면에 표시
- 검색된 골프장을 클릭하면 해당 골프장의 세부 정보(홀 정보)를 불러와 화면에 표시
- 검색 결과가 없을 경우 "검색된 결과가 없습니다." 메시지 출력

#### 홀 데이터 가져오기
- 사용자가 특정 골프장을 선택하면 해당 골프장의 홀 데이터를 가져옴
- 홀 데이터를 홀 이름(`holeName`)별로 그룹화하여 테이블 형태로 표시
- 각 테이블에는 홀 번호, Par, 거리(Distance)셀이 제공됨

#### 스코어보드 표시
- **Par**: 각 홀의 Par 정보
- **Distance (m)**: 각 홀의 거리 정보

#### 데이터 로드
- 골프장 목록 데이터와 홀 데이터는 서버에서 가져오며, 상태 관리로 화면에 반영
- 사용자가 검색어를 입력하거나 특정 골프장을 선택하면 서버 요청을 통해 필요한 데이터만 동적으로 로드

<img src="./Images/스코어보드.gif" alt="스코어보드" width="300">

---

### :black_nib: 커뮤니티 게시판

#### 게시글 목록 조회
- 게시판 메인 페이지에서 모든 게시글을 페이지네이션 형태로 조회
- 페이지 번호 및 "이전/다음" 버튼을 통해 원하는 페이지로 이동
- 각 게시글은 제목, 작성자, 작성일, 조회수를 목록 형태로 표시
- 게시글 제목 클릭 시 상세 페이지로 이동

#### 게시글 작성
- 사용자가 제목과 내용을 입력하여 게시글 작성 가능
- 로그인한 사용자(`memberId`)만 게시글 작성 가능하며, 작성 시 사용자 정보를 포함하여 서버에 요청

#### 게시글 보기
- 특정 게시글 클릭 시 상세 페이지로 이동하여 제목, 내용, 작성자, 작성일, 조회수 표시
- 게시글 작성자만 수정 및 삭제 버튼이 활성화

#### 게시글 수정
- 작성자는 게시글 수정 페이지로 이동하여 제목과 내용을 수정 가능
- 수정 완료 후 "저장" 버튼 클릭 시 서버에 수정된 데이터를 전달

#### 게시글 삭제
- 작성자는 상세 페이지에서 "삭제" 버튼을 클릭하여 게시글 삭제 가능
- 삭제 성공 시 게시글 목록 페이지로 이동

<img src="./Images/게시판.GIF" alt="게시판" width="300">

---

### :gem: 마이페이지 (예약 관리 및 캘린더)

#### 사용자 정보 표시
- 로컬 스토리지에서 `username`을 가져와 사용자 정보를 표시
- 사용자 정보가 없는 경우 "이메일 없음"으로 표시

#### 예약 내역 조회
- 서버로부터 사용자의 예약 데이터를 가져와 테이블 형식으로 표시
- 예약 데이터는 날짜와 시간 기준으로 정렬하여 최신 예약부터 순차적으로 나열

#### 예약 내역 삭제
- 테이블에서 특정 예약의 "삭제" 버튼 클릭 시 예약 삭제 요청을 서버로 전송
- 삭제 성공 시 해당 예약이 테이블에서 제거되고, 사용자에게 성공 메시지 표시

#### 예약 캘린더
- 예약 데이터를 `react-big-calendar`를 사용해 캘린더에 표시
- 캘린더의 예약 이벤트를 클릭하면 예약 상세 정보(골프장 이름, 시간)가 팝업으로 표시

<img src="./Images/마이페이지.gif" alt="마이페이지" width="300">
