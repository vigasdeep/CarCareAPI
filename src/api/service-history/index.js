import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export ServiceHistory, { schema } from './model'

const router = new Router()
const { service_type, frequency, reminder } = schema.tree

/**
 * @api {post} /service-history Create service history
 * @apiName CreateServiceHistory
 * @apiGroup ServiceHistory
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam service_type Service history's service_type.
 * @apiParam frequency Service history's frequency.
 * @apiParam reminder Service history's reminder.
 * @apiSuccess {Object} serviceHistory Service history's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service history not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ service_type, frequency, reminder }),
  create)

/**
 * @api {get} /service-history Retrieve service histories
 * @apiName RetrieveServiceHistories
 * @apiGroup ServiceHistory
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} serviceHistories List of service histories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /service-history/:id Retrieve service history
 * @apiName RetrieveServiceHistory
 * @apiGroup ServiceHistory
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} serviceHistory Service history's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service history not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /service-history/:id Update service history
 * @apiName UpdateServiceHistory
 * @apiGroup ServiceHistory
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam service_type Service history's service_type.
 * @apiParam frequency Service history's frequency.
 * @apiParam reminder Service history's reminder.
 * @apiSuccess {Object} serviceHistory Service history's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service history not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ service_type, frequency, reminder }),
  update)

/**
 * @api {delete} /service-history/:id Delete service history
 * @apiName DeleteServiceHistory
 * @apiGroup ServiceHistory
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Service history not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
