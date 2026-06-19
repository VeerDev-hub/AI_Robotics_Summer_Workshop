import type { FaqItem, WorkshopInfo } from '../types/workshop'

export const workshopInfo: WorkshopInfo = {
  title: 'AI & Robotics Summer Workshop',
  subtitle: 'Build smart robots, train playful AI models, and create with confidence.',
  description:
    'A live 4-week online workshop designed for curious young makers who want to explore coding, robotics logic, sensors, and creative problem-solving through guided projects.',
  ageGroup: '8–14 Years',
  duration: '4 Weeks',
  mode: 'Online',
  fee: '₹2,999',
  startDate: '15 July 2026',
}

export const workshopOutcomes: string[] = [
  'Understand how AI works using age-appropriate, real-world examples and hands-on experiments.',
  'Learn the basics of sensors, actuators, and simple robotics workflows through guided builds.',
  'Create guided mini-projects that combine block-based and text-based coding with problem-solving.',
  'Develop logical thinking, creativity, and confidence by building tangible prototypes each week.',
  'Present a final capstone project idea with a clear explanation of how it works and its real-world use.',
  'Gain familiarity with Python fundamentals and beginner-level machine learning concepts.',
]

export const workshopFaqs: FaqItem[] = [
  {
    question: 'Does my child need prior coding experience?',
    answer:
      'Not at all! The workshop is designed from the ground up for beginners. We start with visual block-based coding and gradually introduce Python concepts, so children of all experience levels can participate confidently.',
  },
  {
    question: 'What device is needed to attend the online sessions?',
    answer:
      "A laptop or desktop computer with a stable internet connection is recommended. A tablet may work for viewing sessions but may limit hands-on coding activities. We'll share a full tech checklist after enrollment.",
  },
  {
    question: 'Will students receive a certificate at the end?',
    answer:
      'Yes! Participants who attend at least 80% of sessions and submit their final project receive a verified digital completion certificate that they can showcase on a portfolio or school application.',
  },
  {
    question: 'How many hours per week does the workshop require?',
    answer:
      'Expect 2–3 hours of live sessions per week, plus optional 1–2 hours of self-paced practice. Sessions are recorded, so children can revisit them if they miss a class.',
  },
  {
    question: 'Can I get a refund if my child cannot continue?',
    answer:
      'We offer a full refund within 7 days of the start date, no questions asked. After that, a 50% refund is available up to the end of Week 2. Please contact us for any concerns.',
  },
]
