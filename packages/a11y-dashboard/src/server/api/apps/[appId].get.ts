import { createError, defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
  const appId = getRouterParam(event, 'appId');
  const models = event.context.$models;
  const { App, AccessibilityIssue } = models;

  try {
    const app = await App.findByPk(appId, {
      include: [
        {
          association: 'usecases',
          include: [
            {
              association: 'lastResult',
              include: [
                {
                  model: AccessibilityIssue,
                  as: 'issues'
                }
              ],
              required: false
            },
          ],
          required: false
        }
      ]
    });
    if (!app) {
      throw createError({
        statusCode: 404,
        statusMessage: 'App not found',
      });
    }
    return app;
  } catch (err: any) {
    throw createError({
      statusCode: 400,
      statusMessage: err.message,
    })
  }
});