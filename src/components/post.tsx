import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { Avatar } from './avatar'
import { Comment } from './comment'
import styles from './post.module.css'

export interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

export interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps {
    author: Author;
    content: Content[];
    publishedAt: Date;
    postId: number;
}

export function Post({ author, content, publishedAt, postId }: PostProps) {
    const [comments, setComments] = useState<string[]>([])
    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const handleCreateNewComment = (event: FormEvent) => {
        event.preventDefault()
        const content = newCommentText
        if(comments?.length > 0) {
            setComments([...comments, content])
        } else {
            setComments([content])
        }
        setNewCommentText('')
    }

    const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    const deleteComment = (commentToDelete: string)  => {
        const newPostComments = comments.filter(comment => comment !== commentToDelete)
        setComments(newPostComments)
    }

    const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                
                <time title={publishedDateFormat} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map((line) => {
                    if(line.type === 'paragraph') return (
                        <p key={`post-${postId}-line-${line.content}`}>{line.content}</p>
                    )
                    if(line.type === 'link') return (
                        <p key={`post-${postId}-line-${line.content}`}><a href="#">{line.content}</a></p>
                    )
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name='comment'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    placeholder='Deixe um comentário'
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button
                        type="submit"
                        disabled={isNewCommentEmpty}
                    >
                        Publicar
                    </button>
                </footer>
            </form>

            {comments?.length > 0 && (
                <div className={styles.commentsList}>
                    {
                        comments.map((comment) => (
                            <Comment
                                key={`comment-${comment}`}
                                content={comment}
                                onDelete={deleteComment}
                            />
                        ))
                    }
                </div>
            )}
        </article>
    )
}