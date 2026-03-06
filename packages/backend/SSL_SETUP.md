# SSL Setup for PERN Backend

This backend server now supports HTTPS using mkcert for local development.

## Prerequisites

1. Install mkcert:
   ```bash
   brew install mkcert
   ```

2. Install the local CA (requires admin privileges):
   ```bash
   mkcert -install
   ```

## SSL Certificates

The SSL certificates are located in the `certs/` directory:
- `localhost+2.pem` - The certificate file
- `localhost+2-key.pem` - The private key file

These certificates are valid for:
- localhost
- 127.0.0.1
- ::1

## Usage

### Start with HTTPS (Secure)
```bash
npm run start:secure
```
This will start the server with HTTPS on port 8443 (default) and HTTP on port 8080.

### Start with HTTPS + New Relic (Production)
```bash
npm run start:secure:prod
```

### Start with HTTP only (Default)
```bash
npm start
```

## Environment Variables

You can customize the ports using environment variables:

- `PORT` - HTTP port (default: 8080)
- `HTTPS_PORT` - HTTPS port (default: 8443)
- `USE_HTTPS` - Enable HTTPS mode (set to 'true')

Example `.env` file:
```
PORT=3000
HTTPS_PORT=3443
USE_HTTPS=true
```

## Accessing the Server

- HTTP: http://localhost:8080
- HTTPS: https://localhost:8443

## Certificate Regeneration

If you need to regenerate the certificates:

```bash
cd certs
rm localhost+2.pem localhost+2-key.pem
mkcert localhost 127.0.0.1 ::1
```

## Browser Trust

If you installed the local CA with `mkcert -install`, your browser will automatically trust the certificates. If not, you may see security warnings in your browser.

## Notes

- The certificates expire on 23 October 2027
- The private keys are excluded from version control
- Both HTTP and HTTPS servers run simultaneously when in secure mode
