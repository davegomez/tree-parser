import test from 'tape';
import mock from 'mock-fs';
import parser from '../src/index';
import includes from '../src/helpers/includes';

test('Should return an Object with a directory structure', t => {
  mock({
    'foo/bar': {
      'foo.txt': 'this is a dummy txt file',
      'foo.html': '<!doctype html><html></html>',
      'foo.json': '{ "name": "App Name" }',
      'bar': {
        'foo.md': '# foo',
        'foo.txt': 'This is another txt file',
        'foo.js': 'console.log("Hello world!")',
        'newBar': {/** empty directory */},
        'newFoo': {/** empty directory */}
      },
      'baz.png': new Buffer([8, 6, 7, 5, 3, 0, 9])
    }
  });

  const dir = parser('foo/bar');

  t.equal(typeof dir, 'object', 'is of type object');
  t.equal(Array.isArray(dir._contents), true, 'dir._contents is an Array');
  t.ok(dir._contents, 'dir._contents exist');
  t.notOk(dir.foo, 'dir.foo doesn\'t exist');
  t.equal(dir._contents.length, 4, 'dir._contents has four elements');
  t.equal(includes(dir._contents, 'foo.html'), true, 'dir._contents includes "foo.html"');
  t.ok(dir.bar._contents, 'dir.bar._contents exist');
  t.equal(dir.bar._contents.length, 3, 'dir.bar._contents has three elements');
  t.equal(includes(dir.bar._contents, 'foo.txt'), true, 'dir.bar._contents includes "foo.txt"');
  t.ok(dir.bar.newBar, 'dir.bar.newBar exist');
  t.ok(dir.bar.newBar._contents, 'dir.bar.newBar._contents exist');
  t.equal(dir.bar.newBar._contents.length, 0, 'dir.bar.newBar._contents has zero elements');
  t.notOk(dir.bar.newBar.bar, 'dir.bar.newBar.bar doesn\'t exist');
  t.ok(dir.bar.newFoo, 'dir.bar.newFoo exist');
  t.ok(dir.bar.newFoo._contents, 'dir.bar.newFoo._contents exist');
  t.equal(dir.bar.newFoo._contents.length, 0, 'dir.bar.newFoo._contents has zero elements');
  t.notOk(dir.bar.newFoo.foo, 'dir.bar.newFoo.foo doesn\'t exist');
  t.end();

  mock.restore();
});

test('Should return an Object with a directory structure and given JSON file as object', t => {
  mock({
    'foo/bar': {
      'foo.txt': 'this is a dummy txt file',
      'foo.html': '<!doctype html><html></html>',
      'foo.json': '{ "name": "App Name" }',
      'bar': {
        'foo.md': '# foo',
        'foo.txt': 'This is another txt file',
        'foo.js': 'console.log("Hello world!")',
        'newBar': {/** empty directory */},
        'newFoo': {/** empty directory */}
      },
      'baz.png': new Buffer([8, 6, 7, 5, 3, 0, 9])
    }
  });

  const dir = parser('foo/bar', 'foo');

  t.ok(dir.foo, 'dir.foo exist');
  t.ok(dir.foo.name, 'dir.foo.name exist');
  t.equal(dir.foo.hasOwnProperty('name'), true, 'dir.foo has the property "name"');
  t.equal(dir.foo.name, 'App Name', 'dir.foo.name value is "App Name"');
  t.notOk(dir.foo.lastName, 'dir.foo.lastName doesn\'t exist');
  t.equal(dir.foo.hasOwnProperty('lastName'), false, 'dir.foo hasn\'t the property "lastName"');
  t.notOk(dir.bar.foo, 'dir.bar.foo doesn\'t exist');
  t.end();

  mock.restore();
});

test('Should return an Object with a directory structure and given JSON files as objects', t => {
  mock({
    'foo/bar': {
      'foo.txt': 'this is a dummy txt file',
      'foo.html': '<!doctype html><html></html>',
      'foo.json': '{ "name": "App Name" }',
      'bar': {
        'foo.md': '# foo',
        'foo.txt': 'This is another txt file',
        'foo.js': 'console.log("Hello world!")',
        'bar.json': '{ "city": "Medellín", "country": "Colombia" }',
        'newBar': {/** empty directory */},
        'newFoo': {/** empty directory */}
      },
      'baz.png': new Buffer([8, 6, 7, 5, 3, 0, 9])
    }
  });

  const dir = parser('foo/bar', 'bar', 'foo', 'baz');

  t.ok(dir.foo, 'dir.foo exist');
  t.ok(dir.foo.name, 'dir.foo.name exist');
  t.equal(dir.foo.hasOwnProperty('name'), true, 'dir.foo has the property "name"');
  t.ok(dir.bar.bar, 'dir.bar.bar exist');
  t.ok(dir.bar.bar.city, 'dir.bar.bar.name exist');
  t.equal(dir.bar.bar.hasOwnProperty('city'), true, 'dir.bar.bar has the property "city"');
  t.equal(dir.bar.bar.country, 'Colombia', 'dir.bar.bar.country value is "Colombia"');
  t.notOk(dir.bar.foo, 'dir.bar.foo doesn\'t exist');
  t.notOk(dir.bar.baz, 'dir.bar.baz doesn\'t exist');
  t.end();

  mock.restore();
});
