import { PostQuestionnaire } from '@/components/post-questionnaire'

export default function Home() {
  return (
    <main className="flex overflow-auto flex-col items-center justify-center">
      <div className='max-w-std-width px-8'>
        <div className='sm:text-6xl text-4xl text-center'>Unleash the Power of AI in Every Post!</div>
        <PostQuestionnaire />
      </div>
    </main>
  )
}
