<h2>반려견 일기(React 구현) </h2>

<ul>
        <li>배포 url : https://mummum-rust.vercel.app/</li>
        <li>Test ID : minj92@kakao.com</li>
        <li>Test PW : fkdnxj0906!!</li>
</ul>

<h3>프로젝트 소개</h3>
<ul>
        <li>나만의 반려견을 위한 일기를 작성 할 수 있습니다.</li>
</ul>


<h3>개발 환경</h3>
<ul>
      <li>Front : React, Ts, Redux Toolkit, Tailwind</li>
      <li>Back : supabase, 공공데이터포털(https://www.data.go.kr/)</li>
      <li>버전 및 이슈 관리 : Github</li>
      <li>디자인 : Figma</li>
      <li>서비스 배포 환경 : vercel</li>
</ul>


<h3>채택한 개발 기술</h3>
<ul>
      <li>상태 관리에는 Redux Toolkit 사용<br>
      Redux Toolkit은 프론트엔드에서 많이 사용되는 상태 관리 라이브러리로, 프로젝트에서 이를 선택해 구현해보았습니다.
      <br><br>
      Redux Toolkit은 상태 관리의 표준화된 방식과 강력한 기능을 제공한다는 점에서 매력적이었습니다. 하지만 사용해보면서 설정해야 할 요소들이 많아 초기 학습 곡선이 높다고 느꼈습니다.
      특히, 슬라이스(slice) 생성, 스토어 구성, 미들웨어 설정 등 다양한 초기 설정 작업이 필요해 처음 접근하기에는 다소 복잡하게 느껴질 수 있었습니다. 이러한 이유로, Redux Toolkit은 확장성과 구조화된 상태 관리에는 강점을 보이지만, 단순한 프로젝트에서는 진입 장벽이 높다고 생각하게 되었습니다.
      <br><br>
      이를 통해 Redux Toolkit의 장점과 한계를 직접 경험할 수 있었으며, 프로젝트 요구사항에 맞는 상태 관리 라이브러리를 선택하는 기준에 대해 더 깊이 이해할 수 있었습니다.
      </li>
</ul>
<ul>
      <li>카카오 로그인, Supabase를 사용, 공공 api 활용, 카카오 지도 api 활용</li>
</ul>


<h3>프로젝트 구조</h3>

```/ (루트 디렉터리)
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ diary
│  │  │  └─ diaryComponents
│  │  │     ├─ List.tsx
│  │  │     ├─ view.tsx
│  │  │     └─ write.tsx
│  │  ├─ login
│  │  │  ├─ login.tsx
│  │  │  └─ logoutHeader.tsx
│  │  ├─ main
│  │  │  ├─ dogMain.tsx
│  │  │  ├─ footer.tsx
│  │  │  └─ weather.tsx
│  │  ├─ map
│  │  │  └─ mapPage.tsx
│  │  └─ themaBg
│  │     ├─ dogName.tsx
│  │     ├─ dogSelect.tsx
│  │     └─ themaSelect.tsx
│  ├─ lib
│  │  ├─ db.ts
│  │  └─ type.ts
│  ├─ main.tsx
│  ├─ redux
│  │  ├─ reducer.ts
│  │  ├─ reduxStore.ts
│  │  ├─ slices
│  │  │  ├─ dogSlice
│  │  │  │  ├─ addDogNameSlice.ts
│  │  │  │  ├─ addDogSelectSlice.ts
│  │  │  │  └─ addDogSlice.ts
│  │  │  ├─ loginSlice
│  │  │  │  └─ userLoginSlice.ts
│  │  │  ├─ mainSlice
│  │  │  │  ├─ mainCitySlice.ts
│  │  │  │  └─ mainPageSlice.ts
│  │  │  └─ user
│  │  │     └─ userWriteSlice.ts
│  │  └─ thunks
│  │     └─ dogthunk
│  │        ├─ addDogNameThunk.ts
│  │        ├─ addDogSelectThunk.ts
│  │        └─ addDogThunk.ts
│  ├─ store.ts
│  ├─ style
│  │  ├─ outstyle.css
│  │  └─ style.css
│  └─ /
└─ /
```


<h3>페이지 별 주요 기능</h3>
<h4>[첫 페이지] </h4>
<img src="https://github.com/user-attachments/assets/a3a09782-32d0-4a59-907a-8d6b6d9e477c" alt="첫페이지"/>
<ul>
      <li>로그인이 되어 있지 않은 경우 : SNS 로그인 페이지</li>
      <li>로그인 후 강아지 선택 페이지</li>
</ul>

<h4>[강아지, 테마 , 이름 작성 페이지] </h4>
<img src="https://github.com/user-attachments/assets/e72f9d65-9e60-4ef5-b6d7-cc029c704f42" alt="강아지, 테마 , 이름 작성 페이지"/>
<ul>
      <li>원하는 강아지, 테마 , 이름 작성 후 메인 페이지로 이동 됩니다.</li>
      <li>한번 선택 한 정보는 변경 불가합니다.</li>
</ul>

<h4>[ 메인 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/9515c26c-ece5-424f-8479-47e7ec1d4211" alt="메인 페이지"/>
<ul>
      <li>사용자가 선택 한 정보 출력(강아지, 테마, 이름)됩니다.</li>
      <li>사용자가 위치한 곳에 따른 미세먼지 농도가 표시 됩니다.</li>
      <li>하단에는 사용자가 선택 할 수 있는 서비스 메뉴가 출력 됩니다.</li>
</ul>


<h4>[ 반려견 일기 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/89c263f9-df1d-4f50-b1f0-bbe27eaa59ed" alt="반려견 일기 페이지"/>
<ul>
      <li>반려견의 하루 일기를 작성, 수정, 삭제 할 수 있습니다.</li>
</ul>


<h4>[ 지도 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/06f49a5b-6532-4a4e-80dd-506321832883" alt="지도 페이지"/>
<ul>
      <li>카카오 지도 Api활용 한 검색 페이지 입니다.</li>
</ul>


<h3>프로젝트 후기</h3>
이 프로젝트는 반려동물을 키우는 사용자가 반려동물의 상태와 일기를 기록할 수 있도록 돕기 위해 시작되었습니다. <br>
기획 단계에서 사용자 경험을 최우선으로 고려하며, 반려동물을 키우는 사용자에게 친숙하면서도 직관적인 디자인을 설계했습니다.
<br><br>
상태 관리를 CSR에서 효율적으로 사용하는 방법과, 전역 상태와 로컬 상태를 나누는 기준에 대해 깊이 학습 했습니다.<br>
레이아웃 구조와 상태 관리의 조화가 얼마나 중요한지 체감하며 실용적인 구조 설계를 익혔습니다.<br>
단순한 기능 구현뿐만 아니라, 사용자가 실제로 필요로 하는 기능과 디자인을 고민하는 것이 개발의 핵심임을 깨달음을 얻었습니다.
