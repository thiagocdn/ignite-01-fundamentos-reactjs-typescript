import { Header } from "./components/header";
import { Author, Content, Post } from "./components/post";
import { Sidebar } from "./components/sidebar";

import styles from './App.module.css'

import './global.css'

interface Post {
  id: number;
  author: Author;
  content: Content[];
  publishedAt: Date;
}

const posts: Post[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/thiagocdn.png',
      name: 'Thiago Cedran',
      role: 'Webdeveloper'
    },
    content: [
      {
        type: 'paragraph',
        content: 'Olha esse texto muito bonito'
      },
      {
        type: 'paragraph',
        content: 'bonito bonito bonito'
      },
      {
        type: 'paragraph',
        content: 'mais bonito que ele é muito mais bonito que o bonito anterior!!'
      },
      {
        type: 'link',
        content: 'https://github.com/thiagocdn'
      }
    ],
    publishedAt: new Date('2022-05-17 18:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Maykabrito',
      role: 'Developer'
    },
    content: [
      {
        type: 'paragraph',
        content: 'Olha esse texto muito bonito 2'
      },
      {
        type: 'paragraph',
        content: 'bonito bonito bonito 2'
      },
      {
        type: 'paragraph',
        content: 'mais bonito que ele é muito mais bonito que o bonito anterior!! 2'
      },
      {
        type: 'link',
        content: 'https://github.com/thiagocdn'
      }
    ],
    publishedAt: new Date('2022-05-17 18:00:00')
  },
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => {
              return (
                <Post
                  key={`post-${post.id}`}
                  postId={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                />
              )
          })
          }
        </main>
      </div>
    </div>
  )
}
