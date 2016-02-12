import test from 'tape';
import mock from 'mock-fs';
import dirContent from '../src/dir-content';
import includes from '../src/helpers/includes';

test('Should return an Array with a directory contents', t => {
  mock({
    'foo/bar': {
      'foo.txt': 'this is a dummy txt file',
      'bar': {
        'foo.md': '# foo'
      },
      'baz.png': new Buffer([8, 6, 7, 5, 3, 0, 9])
    }
  });

  const content = dirContent('foo/bar');

  t.equal(typeof content, 'object', 'is of type object');
  t.equal(Array.isArray(content), true, 'is an Array');
  t.equal(content.length, 3, 'has three elements');
  t.equal(includes(content, 'foo/bar/foo.txt'), true, 'includes "foo/bar/foo.txt"');
  t.equal(includes(content, 'foo/bar/bar'), true, 'includes "foo/bar/bar"');
  t.equal(includes(content, 'foo/bar/baz.png'), true, 'includes "foo/bar/baz.png"');
  t.equal(includes(content, 'foo/bar/foo.md'), false, 'doesn\'t includes "foo/bar/foo.md"');
  t.end();

  mock.restore();
});
