let a = [-6, -91, 1011, -100, 84, -22, 0, 1, 473];

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  let max = A.filter(num => num%4 === 0);
  let max1 = Math.max(...max)
  //console.log(84 % 4);
  console.log(max1) ;
}

solution(a);