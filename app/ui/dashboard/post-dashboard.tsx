import { fetchPosts } from '@/app/lib/data';
import { Post } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default async function PostsDashboard() {
  const posts: Post[] = await fetchPosts();

  if (!posts || posts.length === 0) {
    return <p className="mt-4 text-gray-400">No posts available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Posts
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        {posts.map((post) => (
          <div key={post.id} className="mb-4 rounded-md bg-white p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <Image
                src={post.image_url}
                alt={post.author_name}
                width={40}
                height={40}
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-2">
                <h3 className="text-md font-medium">{post.author_name}</h3>
                <p className="text-sm text-gray-500">{post.author_email}</p>
              </div>
            </div>
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <p className="mt-2 text-sm text-gray-500">
              <CalendarIcon className="inline h-4 w-4 mr-1" />
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Latest Posts</h3>
        </div>
      </div>
    </div>
  );
}
