# gowiki

> Simple docs for teams


setup docs coming

## Build Steps

1. Build the Next.js app in `docs` 

```bash
make docs
```

2. Build go server

```bash
make server
```

3. Run the server, default on port `:8080`
```bash
make run
```

4. Start caddy, reverse proxy on [localhost](localhost)
```bash
make caddy
```
Edit `caddyfile` to configuer everse proxy

**Note**: You can also run the server alone with `make dev`, with live reloading enabled.