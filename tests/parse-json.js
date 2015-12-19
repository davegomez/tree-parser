import test from 'tape';
import mock from 'mock-fs';
import parseJSON from '../src/parse-json';


test('Should return an Object from a JSON file', t => {
  mock({
    'foo/bar.json': '{ "name": "David", "lastName": "Gómez" }'
  });

  const obj = parseJSON('foo/bar.json');

  t.equal(typeof obj, 'object', 'is of type object');
  t.equal(obj.hasOwnProperty('name'), true, 'has the property "name"');
  t.equal(obj.hasOwnProperty('lastName'), true, 'has the property "lastName"');
  t.equal(obj.hasOwnProperty('age'), false, 'hasn\'t the property "age"');
  t.end();

  mock.restore();
});
