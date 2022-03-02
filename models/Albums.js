/**
 * Example model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Albums', {
		tableName: 'Albums',
		user() {
			return this.belongsTo('Users');
		},
		photos() {
			return this.belongsToMany('Photos');
		}
	});
};
