// @typescript-eslint/no-unused-vars: Bật cảnh báo khi có biến không được sử dụng
// Tuy nhiên, biến bắt đầu bằng "_" sẽ không bị cảnh báo
function exampleFunction(_unusedParam: string, usedParam: number) {
  console.log(usedParam);
}

// @typescript-eslint/interface-name-prefix: Tắt quy tắc yêu cầu tiền tố "I" cho interface
interface Person {
  name: string;
  age: number;
}

// @typescript-eslint/explicit-function-return-type: Tắt yêu cầu chỉ định kiểu trả về cho hàm
function greet(person: Person) {
  return `Hello, ${person.name}`;
}

// @typescript-eslint/explicit-module-boundary-types: Tắt yêu cầu chỉ định kiểu trả về cho hàm hoặc giá trị được xuất từ mô-đun
export const getPerson = () => {
  return {
    name: 'John Doe',
    age: 25,
  };
};

// @typescript-eslint/no-explicit-any: Tắt cảnh báo khi sử dụng kiểu "any"
function processData(data: any) {
  console.log(data);
}

// prettier/prettier: Định dạng mã không đúng sẽ bị ESLint đánh dấu là lỗi
const unformattedCode = 'This should be formatted properly by Prettier';
