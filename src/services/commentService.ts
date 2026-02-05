import type { AxiosRequestConfig } from 'axios'
import type {
    CommentResponse,
    CreateCommentRequest,
    CreateCommentResponse,
} from '../types'
import api from './api'

export const commentService = {
    byRoomId: (
        roomId: number,
        config?: AxiosRequestConfig & { skipLoading?: boolean },
    ) => {
        return api.get<CommentResponse>(
            `/binh-luan/lay-binh-luan-theo-phong/${roomId}`,
            { ...config },
        )
    },
    create: (data: CreateCommentRequest, token: string, config?: AxiosRequestConfig & { skipLoading?: boolean }) => {
        return api.post<CreateCommentResponse>('/binh-luan', data, {
            ...config,
            headers: { token },
        })
    }
}
