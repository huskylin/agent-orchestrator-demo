import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Reply {
  id: string
  author: string
  content: string
  createdAt: string
}

interface Comment {
  id: string
  author: string
  content: string
  likes: number
  replies: Reply[]
  createdAt: string
}

interface CommentSectionProps {
  gameId: string
}

// Mock API — replace with real endpoints when backend is ready
const fetchComments = async (_gameId: string): Promise<Comment[]> => {
  return [
    {
      id: '1',
      author: 'Player1',
      content: '這款遊戲很好玩！',
      likes: 5,
      replies: [],
      createdAt: new Date().toISOString(),
    },
  ]
}

const postComment = async ({
  gameId: _gameId,
  content,
}: {
  gameId: string
  content: string
}): Promise<Comment> => {
  return {
    id: Date.now().toString(),
    author: 'Me',
    content,
    likes: 0,
    replies: [],
    createdAt: new Date().toISOString(),
  }
}

const postReply = async ({
  commentId: _commentId,
  content,
}: {
  commentId: string
  content: string
}): Promise<Reply> => {
  return {
    id: Date.now().toString(),
    author: 'Me',
    content,
    createdAt: new Date().toISOString(),
  }
}

const toggleLike = async ({
  commentId: _commentId,
  liked: _liked,
}: {
  commentId: string
  liked: boolean
}): Promise<void> => {
  // Mock — replace with real API call when backend is ready
}

const CommentSection: React.FC<CommentSectionProps> = ({ gameId }) => {
  const [text, setText] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const queryClient = useQueryClient()
  const isLoggedIn = !!localStorage.getItem('auth_token')

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', gameId],
    queryFn: () => fetchComments(gameId),
  })

  const commentMutation = useMutation({
    mutationFn: postComment,
    onMutate: async ({ content }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', gameId] })
      const previous = queryClient.getQueryData<Comment[]>(['comments', gameId])
      const optimistic: Comment = {
        id: `temp-${Date.now()}`,
        author: 'Me',
        content,
        likes: 0,
        replies: [],
        createdAt: new Date().toISOString(),
      }
      queryClient.setQueryData<Comment[]>(['comments', gameId], (old = []) => [
        optimistic,
        ...old,
      ])
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['comments', gameId], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', gameId] })
    },
  })

  const replyMutation = useMutation({
    mutationFn: postReply,
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', gameId] })
      const previous = queryClient.getQueryData<Comment[]>(['comments', gameId])
      const optimisticReply: Reply = {
        id: `temp-reply-${Date.now()}`,
        author: 'Me',
        content,
        createdAt: new Date().toISOString(),
      }
      queryClient.setQueryData<Comment[]>(['comments', gameId], (old = []) =>
        old.map((c) =>
          c.id === commentId ? { ...c, replies: [...c.replies, optimisticReply] } : c
        )
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['comments', gameId], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', gameId] })
    },
  })

  const likeMutation = useMutation({
    mutationFn: toggleLike,
    onMutate: async ({ commentId, liked }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', gameId] })
      const previous = queryClient.getQueryData<Comment[]>(['comments', gameId])
      setLikedComments((prev) => {
        const next = new Set(prev)
        if (liked) next.add(commentId)
        else next.delete(commentId)
        return next
      })
      queryClient.setQueryData<Comment[]>(['comments', gameId], (old = []) =>
        old.map((c) =>
          c.id === commentId ? { ...c, likes: c.likes + (liked ? 1 : -1) } : c
        )
      )
      return { previous }
    },
    onError: (_err, vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['comments', gameId], context.previous)
        setLikedComments((prev) => {
          const next = new Set(prev)
          // revert: if we tried to like, remove it; if unlike, add back
          if (vars.liked) next.delete(vars.commentId)
          else next.add(vars.commentId)
          return next
        })
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', gameId] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    commentMutation.mutate({ gameId, content: text.trim() })
    setText('')
  }

  const handleReplySubmit = (e: React.FormEvent, commentId: string) => {
    e.preventDefault()
    if (!replyText.trim()) return
    replyMutation.mutate({ commentId, content: replyText.trim() })
    setReplyText('')
    setReplyingTo(null)
  }

  const handleLike = (commentId: string) => {
    if (!isLoggedIn) return
    const isLiked = likedComments.has(commentId)
    likeMutation.mutate({ commentId, liked: !isLiked })
  }

  const handleReplyClick = (commentId: string) => {
    if (!isLoggedIn) return
    setReplyingTo(replyingTo === commentId ? null : commentId)
    setReplyText('')
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900">評論</h3>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="輸入評論..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={commentMutation.isPending || !text.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50 transition"
          >
            送出
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500">請登入後發表評論</p>
      )}

      {isLoading ? (
        <p className="text-sm text-gray-500">載入中...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500">尚無評論</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-gray-50 rounded-md p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-800">{comment.author}</span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString('zh-TW')}
                </span>
              </div>
              <p className="text-sm text-gray-700">{comment.content}</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => handleLike(comment.id)}
                  disabled={!isLoggedIn}
                  aria-label="按讚"
                  className={`text-xs transition ${
                    likedComments.has(comment.id)
                      ? 'text-red-500'
                      : 'text-gray-500 hover:text-red-500 disabled:hover:text-gray-500'
                  }`}
                >
                  {likedComments.has(comment.id) ? '♥' : '♡'} {comment.likes}
                </button>
                <button
                  onClick={() => handleReplyClick(comment.id)}
                  disabled={!isLoggedIn}
                  className="text-xs text-gray-500 hover:text-blue-500 disabled:hover:text-gray-500 transition"
                >
                  回覆
                </button>
              </div>

              {replyingTo === comment.id && (
                <form
                  onSubmit={(e) => handleReplySubmit(e, comment.id)}
                  className="flex gap-2 mt-2"
                >
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="輸入回覆..."
                    autoFocus
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    type="submit"
                    disabled={replyMutation.isPending || !replyText.trim()}
                    className="bg-blue-400 text-white px-3 py-1.5 rounded-md text-xs hover:bg-blue-500 disabled:opacity-50 transition"
                  >
                    送出
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="text-xs text-gray-400 hover:text-gray-600 transition px-1"
                  >
                    取消
                  </button>
                </form>
              )}

              {comment.replies.length > 0 && (
                <ul className="mt-2 flex flex-col gap-2 pl-3 border-l-2 border-gray-200">
                  {comment.replies.map((reply) => (
                    <li key={reply.id} className="bg-white rounded-md p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">{reply.author}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(reply.createdAt).toLocaleDateString('zh-TW')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{reply.content}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CommentSection
