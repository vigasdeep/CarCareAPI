import { success, notFound, authorOrAdmin } from '../../services/response/'
import { ServiceHistory } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  ServiceHistory.create({ ...body, user })
    .then((serviceHistory) => serviceHistory.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ServiceHistory.find(query, select, cursor)
    .populate('user')
    .then((serviceHistories) => serviceHistories.map((serviceHistory) => serviceHistory.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ServiceHistory.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((serviceHistory) => serviceHistory ? serviceHistory.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  ServiceHistory.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((serviceHistory) => serviceHistory ? Object.assign(serviceHistory, body).save() : null)
    .then((serviceHistory) => serviceHistory ? serviceHistory.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  ServiceHistory.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((serviceHistory) => serviceHistory ? serviceHistory.remove() : null)
    .then(success(res, 204))
    .catch(next)
