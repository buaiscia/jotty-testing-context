import stringsModule from "./strings";
const { tr } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  mermish: {}
};

describe("language string testing", () => {
  const mockWarn = jest.fn();
  let originalWarn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  test("returns correct submit string for english", () => {
    const string = tr("en", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test("returns the correct submit string for emoji", () => {
    const string = tr("emoji", "submit", strings);
    expect(string).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test("returns english submit string when language does not exist", () => {
    const string = tr("notALanguage", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [notALanguage]"
    );
  });
  test("returns english submit string when submit key does not exist for language", () => {
    const string = tr("mermish", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [mermish]"
    );
  });
});
