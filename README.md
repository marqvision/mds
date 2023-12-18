## MDS: MarqVision Design System

## Project Structure
- components: Button, Checkbox, Dropdown 과 같은 컴포넌트가 위치합니다
- foundation: MDS를 이루는 design token, theme등의 코드가 위치합니다.
- hooks: component처럼 애플리케이션에서 불러와 단독으로 쓰일 수 있는 디자인 시스템의 유틸성 커스텀 hook이 위치합니다. (예: 해상도 watcher)
- utils: component처럼 애플리케이션에서 불러와 단독으로 쓰일 수 있는 디자인 시스템의 유틸성 커스텀 함수가 위치합니다. (예: 화면을 계산하는 로직)
- @stories: components, hooks, theme, utils 에서 개발된 각 내용의 story가 위치합니다.

## Tech stack
- core: react@18.2
- style-library: emotion@11
- headless-ui-frameworks: @mui/base, etc...
- bundler: vite@5
- testing: jest@29, storybook@7

## Conribution


