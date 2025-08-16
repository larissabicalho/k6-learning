import http from 'k6/http';
import {sleep, check} from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 10 }, 
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 } 
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 400']
    },
    ext:{
        loadimpact:{
            projectID: '3884820',
            name: 'POC CURSO K6'
        }
    }
}

export default function(){

    const BASE_URL = 'https://www.vagalume.com.br/u2/index.js';
    const res = http.get(BASE_URL)
    
    check(res,{
        'status 200': (r) => r.status === 200
    });
    sleep(1);
}