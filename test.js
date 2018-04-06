import os from 'os'
import path from 'path'

import rewire from 'rewire'
import test from 'ava'

const m = rewire('.')

const keyFiles = new Set([
	'unicorn',
	'unicorn.pub',
	'daredevil'
])

const fsMock = {
	readdir: (p, cb) => {
		if (p.startsWith('please/fail')) {
			cb(true)
		} else {
			cb(null, Array.from(keyFiles))
		}
	},
	access: (p, cb) => {
		cb(keyFiles.has(path.basename(p)) === false)
	}
}
m.__set__('fs', fsMock)

test('Should return approved keyfiles in default directory', async t => {
	t.deepEqual(await m(), {unicorn: path.join(os.homedir(), '.ssh', 'unicorn')})
})

test('Should return approved keyfiles in custom directory', async t => {
	t.deepEqual(await m('/olalala'), {unicorn: '/olalala/unicorn'})
})

test('Should return no results if examination fails', async t => {
	t.deepEqual(await m('please/fail'), {})
})
