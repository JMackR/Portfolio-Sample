'use strict';

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { NotFoundError, BadRequestError } = require('./custom-error');

const client = new SecretManagerServiceClient();

/**
 * Get the access response object for a given secret version path
 *
 * @param {string} versionPath
 * @returns
 */
async function fetchAndParse(versionPath) {
  const [accessResponse] = await client.accessSecretVersion({ name: versionPath });

  const accessResponsePayload = accessResponse.payload?.data?.toString('utf8');

  if (!accessResponsePayload) {
    throw new NotFoundError('Unable to access environment details.');
  }

  let parsedResponse;

  try {
    parsedResponse = JSON.parse(accessResponsePayload);
  } catch (error) {
    throw new BadRequestError('Unable to parse access response payload.');
  }

  return parsedResponse;
}

/**
 * Gets secret which is not JSON encoded for a given secret version path
 *
 * @param {string} secretVersionPath
 * @returns
 */
async function fetchPrimitive(secretVersionPath) {
  const [accessResponse] = await client.accessSecretVersion({ name: secretVersionPath });

  const accessResponsePayload = accessResponse.payload?.data?.toString('utf8');

  if (!accessResponsePayload) {
    throw new NotFoundError('Unable to access environment details.');
  }

  return accessResponsePayload;
}

/**
 * Builds a version path for secrets
 *
 * @param {string} integration
 * @param {string} projectNumber
 * @returns
 */
const buildVersionPath = (integration, projectNumber) => `projects/${projectNumber}/secrets/${integration}/versions/latest`;

module.exports = {
  fetchAndParse,
  buildVersionPath,
  fetchPrimitive,
};
