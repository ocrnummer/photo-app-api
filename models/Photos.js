/**
 * Photos model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photos', {
		tableName: 'Photos',
		user() {
			return this.belongsTo('Users');
		},
		albums() {
			return this.belongsToMany('Albums');
		}
	}, {
		async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		},
	});
};
