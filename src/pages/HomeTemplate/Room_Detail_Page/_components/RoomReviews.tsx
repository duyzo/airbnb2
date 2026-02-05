import { useState, useEffect } from 'react'
import { Send, Loader2, AlertCircle, ChevronDown } from 'lucide-react'
import { useSelector } from 'react-redux'
import Card from '../../../../components/common/Card'
import Button from '../../../../components/common/Button'
import RatingStars from '../../../../components/common/RatingStars'
import { commentService } from '../../../../services/commentService'
import { useCommentByRoomId } from '../../../../hooks/apiHooks'
import type { Comment, CreateCommentRequest } from '../../../../types/comment'
import type { AuthState } from '../../../../store/slices/authSlice'

interface RootState {
    auth: AuthState
}

interface RoomReviewsProps {
    roomId: number
    onTotalCommentsChange?: (count: number) => void
}

export default function RoomReviews({
    roomId,
    onTotalCommentsChange,
}: RoomReviewsProps) {
    const accessToken = useSelector((state: RootState) => state.auth.token)
    const user = useSelector((state: RootState) => state.auth.user)
    const {
        data: fetchedComments,
        loading: isLoading,
        error,
    } = useCommentByRoomId({ roomId })

    const [comments, setComments] = useState<Comment[]>([])
    const [visibleCommentsCount, setVisibleCommentsCount] = useState(4)
    const [newComment, setNewComment] = useState('')
    const [newRating, setNewRating] = useState(5)
    const [isPosting, setIsPosting] = useState(false)

    useEffect(() => {
        if (fetchedComments) {
            const sortedComments = [...fetchedComments].sort((a, b) => {
                return (
                    new Date(b.ngayBinhLuan).getTime() -
                    new Date(a.ngayBinhLuan).getTime()
                )
            })
            setComments(sortedComments)
            onTotalCommentsChange?.(sortedComments.length)
        }
    }, [fetchedComments, onTotalCommentsChange])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return
        if (!accessToken) {
            alert('You must be logged in to post a comment')
            return
        }

        try {
            setIsPosting(true)
            const payload: CreateCommentRequest = {
                maPhong: roomId,
                maNguoiBinhLuan: user?.id || 1,
                ngayBinhLuan: new Date().toISOString().split('T')[0],
                noiDung: newComment,
                saoBinhLuan: newRating,
            }

            const response = await commentService.create(payload, accessToken)

            if (response.data && response.data.content) {
                const newCommentData = response.data.content
                newCommentData.tenNguoiBinhLuan = user?.name || 'User'
                newCommentData.avatar = user?.avatar || ''
                const updatedComments = [newCommentData, ...comments]

                setComments(updatedComments)
                onTotalCommentsChange?.(updatedComments.length)

                setNewComment('')
                setNewRating(5)
            }
        } catch (err) {
            console.error('Failed to post comment:', err)
            alert('Failed to post comment. Please try again.')
        } finally {
            setIsPosting(false)
        }
    }

    const handleLoadMore = () => {
        setVisibleCommentsCount((prev) => prev + 4)
    }

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            const today = new Date()
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)

            const isToday = date.toDateString() === today.toDateString()
            const isYesterday = date.toDateString() === yesterday.toDateString()

            if (isToday) {
                return date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })
            } else if (isYesterday) {
                return (
                    'Yesterday ' +
                    date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                )
            } else {
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year:
                        date.getFullYear() !== today.getFullYear()
                            ? 'numeric'
                            : undefined,
                })
            }
        } catch {
            return dateString
        }
    }

    return (
        <Card className='p-6'>
            <h2 className='text-2xl font-semibold mb-6'>
                Reviews ({comments.length})
            </h2>

            <form onSubmit={handleSubmit} className='mb-6 pb-6 border-b'>
                <div className='mb-3'>
                    <label className='block text-sm font-medium mb-2'>
                        Your Rating
                    </label>
                    <RatingStars
                        rating={newRating}
                        interactive
                        onRatingChange={setNewRating}
                        size={24}
                    />
                </div>
                <div className='flex gap-2'>
                    <input
                        type='text'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder='Share your experience...'
                        disabled={isPosting}
                        className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 disabled:bg-gray-100'
                    />
                    <Button type='submit' disabled={isPosting}>
                        {isPosting ? (
                            <Loader2 className='w-4 h-4 animate-spin' />
                        ) : (
                            <Send className='w-4 h-4' />
                        )}
                    </Button>
                </div>
            </form>

            {isLoading ? (
                <div className='flex flex-col items-center justify-center py-12 text-gray-500'>
                    <Loader2 className='w-8 h-8 animate-spin mb-2 text-rose-500' />
                    <p>Loading comments...</p>
                </div>
            ) : error ? (
                <div className='flex flex-col items-center justify-center py-8 text-rose-500 bg-rose-50 rounded-lg'>
                    <AlertCircle className='w-8 h-8 mb-2' />
                    <p className='font-medium'>Unable to load comments</p>
                    <p className='text-sm text-gray-600 mt-1'>
                        Please try reloading the page
                    </p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {comments.slice(0, visibleCommentsCount).map((comment) => (
                        <div
                            key={comment.id}
                            className='pb-4 border-b last:border-0'
                        >
                            <div className='flex items-start justify-between mb-2'>
                                <div className='flex items-center gap-3'>
                                    {comment.avatar ? (
                                        <img
                                            src={comment.avatar}
                                            alt={comment.tenNguoiBinhLuan}
                                            className='w-10 h-10 rounded-full object-cover'
                                        />
                                    ) : (
                                        <div className='w-10 h-10 rounded-full bg-linear-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold'>
                                            U
                                        </div>
                                    )}
                                    <div>
                                        <div className='font-semibold'>
                                            {comment.tenNguoiBinhLuan}
                                        </div>
                                        <div className='text-xs text-gray-500'>
                                            {formatDate(comment.ngayBinhLuan)}
                                        </div>
                                    </div>
                                </div>
                                <RatingStars
                                    rating={comment.saoBinhLuan}
                                    size={14}
                                />
                            </div>
                            <p className='text-gray-700 ml-13'>
                                {comment.noiDung}
                            </p>
                        </div>
                    ))}

                    {visibleCommentsCount < comments.length && (
                        <div className='pt-4 text-center'>
                            <button
                                onClick={handleLoadMore}
                                className='inline-flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors'
                            >
                                Show more comments
                                <ChevronDown className='w-4 h-4' />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </Card>
    )
}
