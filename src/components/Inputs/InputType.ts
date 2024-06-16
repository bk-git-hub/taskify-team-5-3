import { InputHTMLAttributes } from 'react';

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}