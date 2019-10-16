import React from "react";
import { shallow, mount } from "enzyme";
import successContext from "./successContext";

function TestComponnent() {
  successContext.useSuccess();
  return <div />;
}

test("throw error when not wrapped in SuccessProvider", () => {
  expect(() => shallow(<TestComponnent />)).toThrow(
    "useSuccess is not called within SuccessProvider"
  );
});
test("does not throw error when not wrapped in SuccessProvider", () => {
  expect(() =>
    mount(
      <successContext.SuccessProvider>
        <TestComponnent />
      </successContext.SuccessProvider>
    )
  ).not.toThrow();
});
