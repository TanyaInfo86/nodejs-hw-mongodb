import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import createHttpError from 'http-errors';

export const swaggerDocs = () => {
  try {
    const swaggerDocument = YAML.load('./docs/openapi.yaml');
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDocument)];
  } catch (error) {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load Swagger YAML documentation"));
  }
};
