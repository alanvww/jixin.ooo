import { CustomPortableText } from 'components/shared/CustomPortableText'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
  classWrapper?: string
}
export function Header(props: HeaderProps) {
  const { title, classWrapper, centered = false } = props
  if (!title) {
    return null
  }
  return (
    <div
      className={`text-[#6E6E6E] ${classWrapper}  ${
        centered ? 'text-center ' : 'w-5/6 lg:w-3/5'
      }`}
    >
      {/* Title */}
      {title && <div className="text-3xl  md:text-5xl">{title}</div>}
    </div>
  )
}
