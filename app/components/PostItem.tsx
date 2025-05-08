import Link from "next/link";

interface PostItemProps {
  id: number;
  title: string;
  body: string;
}

export default function PostItem({ id, title, body }: PostItemProps) {
  return (
    <li
      className="cursor-pointer bg-white rounded-lg shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow duration-300"
      role="listitem"
      tabIndex={0}
      aria-label={`Post titled ${title}`}
    >
      <Link href={`/posts/${id}`} className="block font-semibold text-xl text-primary hover:underline mb-3" prefetch={false}>
        {title}
      </Link>
      <p className="text-gray-700 text-base">{body}</p>
    </li>
  );
}