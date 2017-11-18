# project words-admin
## author davin

###install develop model

    npm install

webpack practise demo config  package.json

        {
            "name": "words-admin",
            "version": "1.0.0",
            "description": "this is init",
            // "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "watch": "webpack --watch",
                // "server": "webpack-dev-server --open",
                "server": "node server.js",
                "build": "webpack"
            },
            "repository": {
                "type": "git",
                "url": "git+https://github.com/adminDavin/words-admin.git"
            },
            "author": "",
            "license": "ISC",
            "bugs": {
                "url": "https://github.com/adminDavin/words-admin/issues"
            },
            "homepage": "https://github.com/adminDavin/words-admin#readme",
            "devDependencies": {
                "clean-webpack-plugin": "^0.1.17",
                "css-loader": "^0.28.7",
                "csv-loader": "^2.1.1",
                "express": "^4.16.2",
                "file-loader": "^1.1.5",
                "html-webpack-plugin": "^2.30.1",
                "react": "^16.1.1",
                "style-loader": "^0.19.0",
                "webpack": "^3.8.1",
                "webpack-dev-middleware": "^1.12.0",
                "webpack-dev-server": "^2.9.4",
                "xml-loader": "^1.2.1"
            }
        }
    
