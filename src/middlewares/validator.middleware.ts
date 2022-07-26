import HttpException from '@exceptions/HttpException';
import Ajv from 'ajv';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { logger } from '../utils/logger';

class ValidationResult {
  data: any;

  error: Array<any>;
}

function getValidationErrors(errors: ValidationError[]): Array<any> {
  const errorList: Array<any> = [];
  if (errors.length > 0) {
    errors.forEach(errorItem => {
      if (errorItem.constraints) {
        errorList.push(errorItem.constraints);
      }
      if (errorItem.children && errorItem.children.length > 0) {
        errorList.push(getValidationErrors(errorItem.children));
      }
    });
  }
  return errorList.flat();
}

/**
 * Validates the request body with the given class.
 *
 *
 * @param classToValidate The DTO class, which has to been validated against the request body.
 * @param allowAdditionalProperties Default true. Set to false, to check for additional properties.
 * @returns
 */
export const validateRequest =
  (classToValidate: any, allowAdditionalProperties: boolean = true) =>
  async (request, _response, next) => {
    const validationResult = new ValidationResult();
    validationResult.data = plainToInstance(classToValidate, request.body);
    validationResult.error = [];

    await validate(validationResult.data, {
      skipMissingProperties: allowAdditionalProperties,
      enableDebugMessages: true,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        validationResult.error.push(getValidationErrors(errors));
        next(new HttpException(400, validationResult));
      }
    });

    next();
  };

/**
 * Validates the dataToValidate param with the given schema. It returns true, when the data is valid.
 *
 * @export
 * @param {*} schema
 * @param {*} dataToValidate
 * @returns {boolean} True, when the dataToValidate is valid with the given schema.
 */
export function validateSchema(schema: any, dataToValidate: any, additionalSchemas?): boolean {
  const ajv = new Ajv({ strictTuples: false });
  const ajvValidateSchema = ajv.addSchema(additionalSchemas || []).compile(schema);
  const valid = ajvValidateSchema(dataToValidate);
  if (!valid) {
    logger.error('Failed to validate json - error:');
    logger.error(JSON.stringify(ajvValidateSchema.errors));
    logger.error('json schema:');
    logger.error(JSON.stringify(schema));
    logger.error('data to validate:');
    logger.error(JSON.stringify(dataToValidate));
  }
  return valid;
}
