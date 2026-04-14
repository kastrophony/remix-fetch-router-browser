# remix fetch router browser

Runs [remix/fetch-router](https://github.com/remix-run/remix) in a service
worker

## Run

**build**

Bundles the entrypoint and service worker to the public directory

```bash
deno task build
```

**dev**

Same as above but rebuilds when target files change

```bash
deno task dev
```

**serve**

diy, you need to serve the public directory
