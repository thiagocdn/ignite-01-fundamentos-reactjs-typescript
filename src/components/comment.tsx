import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './avatar'
import styles from './comment.module.css'

interface CommentProps {
    content: string;
    onDelete: (comment: string) => void;
}

export function Comment({ content, onDelete }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0)

    const handleDeleteComment = () => {
        onDelete(content)
    }

    const handleLikeCount = () => {
        setLikeCount((lastLikeCount) => lastLikeCount + 1)
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/thiagocdn.png" />
            
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Thiago Cedran Santos</strong>
                            <time title="11 de Maio às 11h13" dateTime="2022-05-11 08:13:00">Cerca de 1hr atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeCount}>
                        <ThumbsUp />
                        Aplaudir {likeCount > 0 && <span>{likeCount}</span>}
                    </button>
                </footer>
            </div>
        </div>
    )
}