# Dice Minigame

```bash
# Install Depedencies
npm install

# Migration using sequelize cli
# Configure your db connection on config/config.json
npm i -g sequelize-cli

sequelize db:migrate

# Seed DB
sequelize db:seed:all

# Start Server
npm run dev
```

At this point, you should be able to access the game on `http://127.0.0.1:3000`.

## Troubleshooting
```bash
# Unroll DB Migration
sequelize db:migrate:undo:all

# Unroll DB Seed
sequelize db:seed:undo:all
```