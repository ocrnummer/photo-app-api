/**
 * Example model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'Photos',
		user() {
			return this.belongsTo('User');
		},
		album() {
			return this.belongsToMany('Albums');
		}
	});
};
