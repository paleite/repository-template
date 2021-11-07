import * as Message from "./message";

describe("message", () => {
  it("should return a message", () => {
    expect(Message.getMessage()).toBe("hello world");
  });
});
