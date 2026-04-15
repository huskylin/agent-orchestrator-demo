import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Comment {
  id: string
  author: string
  content: string
  likes: number
  replies: Comment[]
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

const CommentSection: React.FC<CommentSectionProps> = ({ gameId }) => {
  const [text, setText] = useState('')
  const queryClient = useQueryClient()
  const isLoggedIn = !!localStorage.getItem('auth_token')

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', gameId],
    queryFn: () => fetchComments(gameId),
  })

  const mutation = useMutation({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    mutation.mutate({ gameId, content: text.trim() })
    setText('')
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900">評論</h3>

      {isLoggedIn && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="輸入評論..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={mutation.isPending || !text.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50 transition"
          >
            送出
          </button>
        </form>
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
                <button className="text-xs text-gray-500 hover:text-red-500 transition">
                  &#9829; {comment.likes}
                </button>
                <button className="text-xs text-gray-500 hover:text-blue-500 transition">
                  回覆
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CommentSection
