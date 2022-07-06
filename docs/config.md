# Configuration

Example of `.env` file:

```dosini
# reverse-proxy
DOMAIN="localhost"

# postgres credits
POSTGRES_USER="someuser"
POSTGRES_PASSWORD="password"

# client
REACT_APP_API_URL="http://localhost:5000/api"

# prisma database url
DATABASE_URL="postgresql://someuser:password@database:5432/inventory?schema=public"

```

## Database URL

```dosini
# use "database" for deploy and "localhost" for development
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db-name>?schema=public"
```

Where:

- `user` - database user (`postgres` by default);
- `password` - database password;
- `host` - database host (`database` by default, see `docker-compose.yaml`);
- `port` - database port (`5432` by default);
- `db-name` - database name.
