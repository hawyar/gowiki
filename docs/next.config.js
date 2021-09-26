module.exports = {
  async rewrites() {
    // When running Next.js via Node.js (e.g. `dev` mode), proxy API requests
    // to the Go server.
    return [
      {
        source: '/api',
        destination: 'http://localhost:8080/api',
      },
    ]
  },
  webpack5: true,
}
