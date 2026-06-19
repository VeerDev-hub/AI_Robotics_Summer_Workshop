export type WorkshopInfo = {
  title: string
  subtitle: string
  description: string
  ageGroup: string
  duration: string
  mode: string
  fee: string
  startDate: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type EnquiryFormData = {
  name: string
  email: string
  phone: string
  discountCode?: string
}
