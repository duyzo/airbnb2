import api from './api'
import type { LocationResponse } from '../types'

export const locationService = {
    list: () => api.get<LocationResponse>('/vi-tri'),
}
