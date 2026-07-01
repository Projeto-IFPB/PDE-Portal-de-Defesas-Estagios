import { Check } from "lucide-react";

interface CardListaRequisitosProps {
  items: string[];
}

export default function CardListaRequisitos({ items }: CardListaRequisitosProps) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          </span>
          <span className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
