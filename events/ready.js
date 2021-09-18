module.exports = class {
	constructor(client) {
		this.client = client;
		this.once = true;
	}

	async run() {
		console.log(`Login into: ${this.client.user.username}.`)
    }
}