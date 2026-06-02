"use client";

// need this wrapper because next.js layout is a server component
// but redux Provider needs to run on client side

import { Provider } from "react-redux";
import store from "@/store/store";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
