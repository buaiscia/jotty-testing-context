import moxios from "moxios";
import { getSecretWord } from "./hookActions";
import { testNameToKey } from "jest-snapshot/build/utils";

describe("moxios test", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("setSecretWord is called with secretWord after api call", async () => {
    const secretWord = "party";
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      });
    });

    const mockSetSecretWord = jest.fn();

    // call getSecretWord and wait for answer
    await getSecretWord(mockSetSecretWord);
    // check if called with right paramenter
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
