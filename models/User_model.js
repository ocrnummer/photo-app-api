/**
* Users model
*/

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'Users',
		photos() {
			return this.hasMany('Photo');
		},
		albums() {
			return this.hasMany('Album');
		}
	}, {
		hashSalt: 10,

		async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		},

		// async login(email, password) {
		// 	const user = await new this({ email }).fetch({ require: false });
		// 	if (!user) {
		// 		return false;
		// 	}

		// 	const hash = user.get('password');
		// 	const hashedPassword = await bcrypt.compare(hash, password);
		// 	if (!hashedPassword) {
		// 		return false;
		// 	}

		// 	return user;
		// }
	});
};
