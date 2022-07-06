# Inventory system

This application was created to manage the property of the organization.

Before run development or production please [fill `.env` file](./docs/config.md).

## Development

Install pnpm:

```bash
npm i --global pnpm
```

Run development environment:

```bash
# install deps
pnpm dev:deps
# run postgres in docker
pnpm db:up
# push scheme to postgres
pnpm prisma:push
# start dev servers
pnpm dev:start
```

## Production

To deploy the application, you need to install `docker` and `docker-compose`.

Guide: [How To Install Docker Compose. Digital Ocean.](https://www.digitalocean.com/community/tutorial_collections/how-to-install-docker-compose)

```bash
pnpm prod:up
```
