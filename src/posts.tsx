export type PostType = {
  id: string
  title: string
  body: string
}

export class PostNotFoundError extends Error {}

export const fetchPost = async (postId: string) => {
  console.info(`Fetching post with id ${postId}...`)
  await new Promise((r) => setTimeout(r, 500))

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)

    if (response.status === 404) {
      throw new PostNotFoundError(`Post with id "${postId}" not found!`)
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const post: PostType = await response.json()
    return post
  } catch (err) {
    if (err instanceof PostNotFoundError) {
      throw err
    }
    throw new Error('Failed to fetch post: ' + (err instanceof Error ? err.message : String(err)))
  }
}

export const fetchPosts = async () => {
  console.info('Fetching posts...')
  await new Promise((r) => setTimeout(r, 500))

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const posts: Array<PostType> = await response.json()
    return posts.slice(0, 10)
  } catch (err) {
    throw new Error('Failed to fetch posts: ' + (err instanceof Error ? err.message : String(err)))
  }
}
