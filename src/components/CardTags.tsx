interface CardTagsProps {
  tags: string[];
}

export default function CardTags({ tags }: CardTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full text-sm font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
