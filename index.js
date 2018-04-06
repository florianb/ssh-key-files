'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')

module.exports = dir => {
	return new Promise(resolve => {
		const keyFiles = {}
		let filesLeft = 0
		const keyDir = dir || path.join(os.homedir(), '.ssh')

		fs.readdir(keyDir, (err, files) => {
			if (err) {
				resolve(keyFiles)
			} else {
				filesLeft = files.length
				files.forEach(file => {
					const filePath = path.join(keyDir, file)
					fs.access(filePath, err => {
						if (err) {
							filesLeft--
						} else {
							fs.access(`${filePath}.pub`, err => {
								filesLeft--
								if (!err) {
									keyFiles[file] = filePath
								}
								if (filesLeft < 1) {
									resolve(keyFiles)
								}
							})
						}
						if (filesLeft < 1) {
							resolve(keyFiles)
						}
					})
				})
			}
		})
	})
}
