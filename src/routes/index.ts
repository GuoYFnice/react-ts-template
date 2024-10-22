import { lazy } from 'react';

// ? useInputBind.
const InputBind = lazy(() => import(/* webpackChunkName: "useInputBind" */ 'Pages/BindElement/InputBind'));
// ? useCheckboxBind.
const CheckboxBind = lazy(() => import(/* webpackChunkName: "useCheckboxBind" */ 'Pages/BindElement/CheckboxBind'));
// ? useTextSelection.
const TextSelectionBind = lazy(
  () => import(/* webpackChunkName: "useTextSelection" */ 'Pages/BindElement/TextSelectionBind')
);
// ? useDrag & useDrop.
const DragDrop = lazy(() => import(/* webpackChunkName: "useDragDrop" */ 'Pages/DraggableElement'));
// ? useSize.
const WindowResize = lazy(() => import(/* webpackChunkName: "useSize" */ 'Pages/ResizeObserver'));
// ? useScroll.
const GetEleScrollOptions = lazy(
  () => import(/* webpackChunkName: "useScroll" */ 'Pages/ScrollOptions/GetEleScrollOptions')
);
// ? useVirtualList.
const VirtualList = lazy(() => import(/* webpackChunkName: useVirtualList */ 'Pages/ScrollOptions/VirtualList'));
// ? useInterval.
const Interval = lazy(() => import(/* webpackChunkName: "useInterval" */ 'Pages/Timer'));
// ? useHistory.
const TodoHistoryManager = lazy(() => import(/* webpackChunkName: "useHistory" */ 'Pages/State'));
// ? useDebounce.
const DebouncedInputValue = lazy(
  () => import(/* webpackChunkName: "useDebounce" */ 'Pages/Debounce/DebouncedInputValue')
);
// ? useDebounceFn.
const DebouncedFunction = lazy(
  () => import(/* webpackChunkName: "useDebounceFn" */ 'Pages/Debounce/DebouncedFunction')
);
// ? useThrottle.
const ThrottledInputValue = lazy(
  () => import(/* webpackChunkName: "useThrottle" */ 'Pages/Throttle/ThrottledInputValue')
);
// ? useThrottleFn.
const ThrottledFunction = lazy(() => import(/* webpackChunkName: "useThrottleFn" */ 'Pages/Throttle/ThrottleFunction'));

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
  {
    path: '/DraggableElement/DragDrop',
    component: DragDrop
  },
  {
    path: '/ResizeObserver/WindowResize',
    component: WindowResize
  },
  {
    path: '/ScrollOptions/GetEleScrollOptions',
    component: GetEleScrollOptions
  },
  {
    path: '/ScrollOptions/VirtualList',
    component: VirtualList
  },
  {
    path: '/Timer/Interval',
    component: Interval
  },
  {
    path: '/State/TodoHistoryManager',
    component: TodoHistoryManager
  },
  {
    path: '/Debounce/DebouncedInputValue',
    component: DebouncedInputValue
  },
  {
    path: '/Debounce/DebouncedFunction',
    component: DebouncedFunction
  },
  {
    path: '/Throttle/ThrottledInputValue',
    component: ThrottledInputValue
  },
  {
    path: '/Throttle/ThrottledFunction',
    component: ThrottledFunction
  }
];
