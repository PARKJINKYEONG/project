## React 폴더구조
- src
    - components : 재사용 가능한 컴포넌트, 폴더 내부에서 하위폴더로 분류 (컴포넌트 위치).
    - assets : 이미지 / 폰트 파일 저장, 컴포넌트 내부에서 사용하는 이미지는 assets 폴더.
        (public : index.html 등에서 내부에서 직접 이미지를 사용하는 경우).
    - hooks : 커스텀 훅이 위치하는 폴더.
    - pages : react router등을 이용하여 라우팅을 적용할 때, 적용할 페이지를 위치시키는 곳 (페이지 위치).
    - constants : 공통적으로 사용되는 상수들을 정의한 파일들이 위치하는 폴더.
    - config : 여러개의 config파일이 있을 경우 폴더로 분리.
    - styles : css 파일 위치
    - services : api 관련 로직의 모듈 파일 위치. auth와 같이 인증관련된 파일이 포함되기도 함.
    - utils : 정규표현식 패턴, 공통 함수 등 공통 사용 유틸 파일 위치.
    - contexts : 상태관리를 위한 context위치. redux를 이용할 경우 이름을 store로 사용.
    
    - 'App.js'
    - 'index.js'




## npm install

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### installed module

```
- npm install
- npm install axios
- npm install react-router-dom@6
- npm install http-proxy-middleware
- npm install react-modal
- npm install react-datepicker
- npm install date-fns
- npm install @react-google-maps/api
- npm install bootstrap
- npm install @mui/material @emotion/react @emotion/styled
- npm install @mui/material @mui/styled-engine-sc styled-components
- npm install @mui/icons-material
- npm install mqtt
- npm install @mui/x-charts 
- npm install @mdi/react @mdi/js
- npm install react-icons --save
- npm install npm install @mui/x-date-pickers
- npm install @mui/x-date-pickers-pro
- npm install dayjs
- npm install react-beautiful-dnd
- npm install @mui/lab
- npm install @fullcalendar/core @fullcalendar/daygrid
- npm install @chatscope/chat-ui-kit-react @chatscope/chat-ui-kit-styles
- npm install react-day-picker
- npm install react-media-recorder

```