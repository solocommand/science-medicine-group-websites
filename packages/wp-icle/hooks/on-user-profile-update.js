const debug = require('debug')('wp-icle');
const { getAsObject } = require('@parameter1/base-cms-object-path');
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

/**
 * Pushes an event to the configured SQS queue when a user profile update occurs.
 * @param {*} args
 */
module.exports = async ({ service, user }) => {
  const config = getAsObject(service, 'res.locals.icle');

  // Do not dispatch updates when syncing users
  const { originalUrl } = getAsObject(service, 'req');
  if (originalUrl === '/api/update-identityx-users') return;

  const { id, email } = user;

  // Initialize SQS client
  const client = new SQSClient({
    region: config.region,
    credentials: { accessKeyId: config.accessKey, secretAccessKey: config.secretKey },
  });

  // Push message to SQS
  const r = await client.send(new SendMessageCommand({
    QueueUrl: config.queueUrl,
    MessageBody: JSON.stringify({ id, email }),
  }));

  debug(`Dispatched user update to SQS with message id ${r.MessageId}.`);
};
