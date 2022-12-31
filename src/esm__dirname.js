console.log(import.meta.url);
const __dirname = import.meta.url.split('/').slice(0, -1).join('/');
console.log(__dirname);

console.log(import.meta.url.split('/').slice(0, -1));

/*
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

WaitForOptions.waitUntil
*/