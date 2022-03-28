/**
 * Photos model
 */

module.exports = (bookshelf) => {
	return bookshelf.model(
		"Photo",
		{
			tableName: "Photos",
			user() {
				return this.belongsTo("User");
			},
			albums() {
				return this.belongsToMany("Album");
			},
		},
		{
			async fetchById(id, fetchOptions = {}) {
				return await new this({ id }).fetch(fetchOptions);
			},
		}
	);
};
