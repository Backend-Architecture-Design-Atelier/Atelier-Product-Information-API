import http from 'k6/http';
import { check, sleep } from 'k6';

const productList = 'http://localhost:3000/products/?page=1&count=5'
const productInformation = 'http://localhost:3000/products/1';
const productStyles = 'http://localhost:3000/products/1/styles';
const relatedProducts = 'http://localhost:3000/products/1/related';

export const options = {
  vus: 100,
  duration: '30s',

  // stages: [
  //   { duration: '20s', target: 100 }, // below normal load
  //   { duration: '30s', target: 100 },
  //   { duration: '20s', target: 200 }, // normal load
  //   { duration: '30s', target: 200 },
  //   { duration: '20s', target: 300 }, // around the breaking point
  //   { duration: '30s', target: 300 },
  //   { duration: '20s', target: 400 }, // beyond the breaking point
  //   { duration: '30s', target: 400 },
  //   { duration: '30s', target: 0 }, // scale down. Recovery stage.
  // ]
};

export default function () {
  let res = http.get('http://localhost:3000/products/?page=1&count=5');
  check(res, { 'is status 200': (r) => r.status === 200 });
}