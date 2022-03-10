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
	});
};
