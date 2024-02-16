// this file makes this app work with https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo
module.exports = {
    client: {
        service: {
            name: 'local',
            localSchemaFile: require('path').join(__dirname, 'schema.graphql'),
        },
        includes: ['src/**/*.{ts,tsx}'],
    },
};