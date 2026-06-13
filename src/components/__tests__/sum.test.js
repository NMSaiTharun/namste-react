import sum from "../sum";
test("Testing Sum of Two Number", () => {
  const result = sum(3, 4);
  expect(result).toBe(12);
});
