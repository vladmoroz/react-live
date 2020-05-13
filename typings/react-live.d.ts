import { ComponentClass, HTMLProps, ComponentType, Context } from 'react'

// Helper types
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// React Element Props
type DivProps = HTMLProps<HTMLDivElement>
type PreProps = HTMLProps<HTMLPreElement>

// LiveProvider
export type LiveProviderProps = Omit<DivProps, 'scope'> & {
  scope?: { [key: string]: any };
  code?: string;
  noInline?: boolean;
  transformCode?: (code: string) => string;
  disabled?: boolean;
}

export const LiveProvider: ComponentClass<LiveProviderProps>

// Context
export interface ContextProps {
  code?: string;
  disabled?: boolean;
  error?: string;
}

export const LiveContext: Context<ContextProps>;

// LiveError
export const LiveError: ComponentClass<DivProps>

// LivePreview
export const LivePreview: ComponentClass<DivProps>

// withLive HOC
export function withLive<P>(wrappedComponent: ComponentType<P>): ComponentClass<P>
