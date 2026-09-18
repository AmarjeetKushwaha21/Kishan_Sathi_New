import { cn } from '@/utils/cn';

export default function ChatBubble({ message }) {
  const mine = message.from === 'farmer';
  return (
    <div className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft',
          mine ? 'rounded-br-md bg-primary-600 text-white' : 'rounded-bl-md bg-white text-gray-800'
        )}
      >
        <p>{message.text}</p>
        <p className={cn('mt-1 text-right text-[10px]', mine ? 'text-primary-100' : 'text-gray-400')}>{message.time}</p>
      </div>
    </div>
  );
}