# PG Replicator

This is a simple tool to replicate data from one Postgres database to another.
First of all I need it to support my stage servers. If you need it in case you need it, use it!

## Environment variables

| Name                       | Description                             |
|----------------------------|-----------------------------------------|
| `APP_API_KEY`              | The API key of the PG Replicator server |
| `APP_DB_MASTER_CONNECTION` | Master database connection string       |
| `APP_DB_STAGE_CONNECTION`  | Stage database connection string        |

## GitHub Actions

```yaml
steps:
  - name: DB Replicate
    shell: bash
    env:
      PG_REPLICATOR_URL: ${{ secrets.PG_REPLICATOR_URL }}
      PG_REPLICATOR_API_KEY: ${{ secrets.PG_REPLICATOR_API_KEY }}
    run: |
      response=$(curl -X 'POST' \
        "$PG_REPLICATOR_URL/api/replicate" \
        -H 'accept: application/json' \
        -H 'Content-Type: application/json' \
        -d "{\"apiKey\": \"$PG_REPLICATOR_API_KEY\"}" \
        -w "%{http_code}" \
        -o /dev/null \
        -s)

      if [ "$response" -ne 200 ]; then
        echo "Replication failed with status code: $response"
        exit 1
      fi
```

## License

This app is open-sourced software licensed under the MIT license.
