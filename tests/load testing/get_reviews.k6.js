import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 0 },
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 100 },
    { duration: '30s', target: 20 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  let id = Math.floor(Math.random() * (5760000 - 1 + 1) + 1)
  const res = http.get(`http://ec2-34-238-193-252.compute-1.amazonaws.com/reviews?product_id=${id}`,
    { tags: { name: 'getReviews' } });
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}