import { lazy } from 'react';

// ? useInputBind.
const InputBind = lazy(() => import(/* webpackChunkName: "useInputBind" */ 'Pages/BindElement/InputBind'));

// ? useCheckboxBind.
const CheckboxBind = lazy(() => import(/* webpackChunkName: "useCheckboxBind" */ 'Pages/BindElement/CheckboxBind'));

// ? useTextSelection.
const TextSelectionBind = lazy(() =>
  import(/* webpackChunkName: "useTextSelection" */ 'Pages/BindElement/TextSelectionBind')
);

// // ? useDrag & useDrop.
// const DragDrop = lazy(() => import(/* webpackChunkName: "useDragDrop" */ '@pages/DraggableElement/index.js'));

// ? useSize.
const WindowResize = lazy(() => import(/* webpackChunkName: "useSize" */ 'Pages/ResizeObserver/index'));

// // ? useScroll.
// const GetEleScrollOptions = lazy(() =>
//   import(/* webpackChunkName: "useScroll" */ '@pages/ScrollOptions/GetEleScrollOptions/index.js')
// );
// // ? useVirtualList.
// const VirtualList = lazy(() => import(/* webpackChunkName: useVirtualList */'@pages/ScrollOptions/VirtualList/index.js'));
// // ? useInterval.
// const Interval = lazy(() => import(/* webpackChunkName: "useInterval" */ '@pages/Timer/index.js'));
// // ? useHistory.
// const TodoHistoryManager = lazy(() => import(/* webpackChunkName: "useHistory" */ '@pages/State/index.js'));
// // ? useDebounce.
// const DebouncedInputValue = lazy(() =>
//   import(/* webpackChunkName: "useDebounce" */ '@pages/Debounce/DebouncedInputValue/index.js')
// );
// // ? useDebounceFn.
// const DebouncedFunction = lazy(() =>
//   import(/* webpackChunkName: "useDebounceFn" */ '@pages/Debounce/DebouncedFunction/index.js')
// );
// // ? useThrottle.
// const ThrottledInputValue = lazy(() =>
//   import(/* webpackChunkName: "useThrottle" */ '@pages/Throttle/ThrottledInputValue/index.js')
// );
// // ? useThrottleFn.
// const ThrottledFunction = lazy(() =>
//   import(/* webpackChunkName: "useThrottleFn" */ '@pages/Throttle/ThrottledFunction/index.js')
// );

export const routes = [
  {
    path: '/BindElement/InputBind',
    component: InputBind
  },
  {
    path: '/BindElement/CheckboxBind',
    component: CheckboxBind
  },
  {
    path: '/BindElement/TextSelectionBind',
    component: TextSelectionBind
  },
  // {
  //   path: '/DraggableElement/DragDrop',
  //   component: DragDrop
  // },
  {
    path: '/ResizeObserver/WindowResize',
    component: WindowResize
  }
  // {
  //   path: '/ScrollOptions/GetEleScrollOptions',
  //   component: GetEleScrollOptions
  // },
  // {
  //   path: '/ScrollOptions/VirtualList',
  //   component: VirtualList
  // },
  // {
  //   path: '/Timer/Interval',
  //   component: Interval
  // },
  // {
  //   path: '/State/TodoHistoryManager',
  //   component: TodoHistoryManager
  // },
  // {
  //   path: '/Debounce/DebouncedInputValue',
  //   component: DebouncedInputValue
  // },
  // {
  //   path: '/Debounce/DebouncedFunction',
  //   component: DebouncedFunction
  // },
  // {
  //   path: '/Throttle/ThrottledFunction',
  //   component: ThrottledFunction
  // },
  // {
  //   path: '/Throttle/ThrottledInputValue',
  //   component: ThrottledInputValue
  // }
];
