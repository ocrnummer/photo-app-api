/**
* Users model
*/

module.exports = (bookshelf) => {
	return bookshelf.model('Users', {
		tableName: 'Users',
		photo() {
			return this.hasMany('Photos');
		},
		albums() {
			return this.hasMany('Albums');
		}
	});
};
