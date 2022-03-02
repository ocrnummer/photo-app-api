/**
* Users model
*/

module.exports = (bookshelf) => {
	return bookshelf.model('Users', {
		tableName: 'Users',
		photos() {
			return this.hasMany('Photos');
		},
		albums() {
			return this.hasMany('Albums');
		}
	});
};
