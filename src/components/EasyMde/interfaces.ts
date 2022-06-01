import { TextareaHTMLAttributes } from 'react'
import EasyMde from 'easymde'

export interface SimpleMdeProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  options?: EasyMde.Options
  onTextChange: (value: string) => void
}
