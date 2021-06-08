module.exports = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Users managment & authentication API",
			version: "1.0.0",
			description: "A simple API wich allows administrators and customers manage user's accounts",
		},
		schemes: ['http', 'https'], 
		securityDefinitions: { 
			Bearer: { 
				type: "apiKey", 
				name: "Authorization", 
				in: "header", 
				description: "Token from LOGIN API in Bearer TOKEN format"
			}
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		},
		servers: [
			{
				url: "http://localhost:4000/api/v0",
			},
		],
	},
	apis: ["./src/routes/*.js"],
}