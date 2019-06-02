import { ServiceHistory } from '.'
import { User } from '../user'

let user, serviceHistory

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  serviceHistory = await ServiceHistory.create({ user, service_type: 'test', frequency: 'test', reminder: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = serviceHistory.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(serviceHistory.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.service_type).toBe(serviceHistory.service_type)
    expect(view.frequency).toBe(serviceHistory.frequency)
    expect(view.reminder).toBe(serviceHistory.reminder)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = serviceHistory.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(serviceHistory.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.service_type).toBe(serviceHistory.service_type)
    expect(view.frequency).toBe(serviceHistory.frequency)
    expect(view.reminder).toBe(serviceHistory.reminder)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
