# [api.ajax-discord.com](https://ajax-discord.com/)

[![node](https://img.shields.io/badge/Node.js-v.12.X-brightgreen)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/MySQL-v.8.0-9cf)](https://www.mysql.com/)
![requirements](https://img.shields.io/badge/requirements-up%20to%20date-brightgreen)

**This is the API behind the AJAX discord bot project.**
*Since AJAX's version 4.0.0 you **need** this API to run it*

> As this project is under heavy development, I cannot offer support at this time.  However, please do report bugs or issues on my little project [here.](https://github.com/Worthy-Alpaca/AJAX/issues)

# Want to contribute to this project?

## Things to know

By contributing to this repository, you are expected to know and follow the rules of general conduct outlined in the [Code of Conduct.](https://github.com/Worthy-Alpaca/api.ajax-discord.com/blob/master/CODE_OF_CONDUCT.md#contributor-covenant-code-of-conduct)

**Working on your first Pull Request?** [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## How to

* Found a bug?
  [Let me know!]()

* Patched a bug?
  [Make a PR!](https://github.com/Worthy-Alpaca/api.ajax-discord.com/compare/)

* Adding a new feature?
  Please, *please*, ***please*** get some feedback from me. I don't want you to waste your time writing code on something that was struck down already.


### How to set everything up

* First you need to install Node.js

    - For linux systems: 
    ```
    sudo apt-get install nodejs
    ```
    - Download for Windows systems [here](https://nodejs.org/en/download/)

    - Make sure it's version 12.X or higher
    ```
    node -v
    ```

- Then you need to install the Node Package Manager (only on linux)
```
sudo apt-get install npm
```
  * Make sure it's the latest version
  ```
  npm -v
  ```

- Now clone the repository
```
git clone https://github.com/Worthy-Alpaca/AJAX.git
```

- Now install the dependencies from package.json
```
npm install
```

- Next you need to install MySQL 

    - For linux systems follow [this](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04) guide if you're unsure otherwise just do this
    ```
    sudo apt update
    sudo apt install mysql-server
    sudo mysql_secure_installation
    ```
    - For Windows you can download it [here](https://dev.mysql.com/downloads/windows/installer/8.0.html)

- Set up your database

- Lastly you need to put some things into the included env file and rename it to .env
    - Your desired Database name (make sure this correspondes with the step above)
    - Your database password
    - The Website Address (Not needed if you only use the bot)
    - The API token secret (make sure that this is the same as in AJAX and ajax-discord.com)

Thats it