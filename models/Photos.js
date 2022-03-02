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
	});
};
