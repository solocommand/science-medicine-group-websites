module.exports = {
  // If the entire sync process is enabled. Driven by env to bypass in integration tests
  enabled: false,
  // The WP-ICLE API hostname to use (varies by tenant/site and environment)
  hostname: process.env.WPICLE_API_HOSTNAME || 'my.auntminnie.com',
  // The WP-ICLE API key to use (varies by endpoint)
  apiKey: process.env.WPICLE_API_KEY,
  // The SQS queue to use
  queueUrl: process.env.WPICLE_AWS_SQS_QUEUE_URL,
  // AWS credentials to push to queue
  accessKey: process.env.WPICLE_AWS_ACCESS_KEY_ID,
  secretKey: process.env.WPICLE_AWS_SECRET_ACCESS_KEY,
};
