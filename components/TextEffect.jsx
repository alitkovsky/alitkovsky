import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useTextEffect, resolveAutoVariant } from '@/hooks/useTextEffect'

const TextEffect = forwardRef(function TextEffect(
  {
    as: Component = 'span',
    variant = 'underlineLong',
    trigger = 'hover',
    basePath = '/text-effects',
    initiallyVisible = false,
    visibilityRootMargin,
    visibilityThreshold,
    effectRef,
    className,
    children,
    ...rest
  },
  forwardedRef,
) {
  // Resolve auto variants once per component instance
  // This ensures the random selection is stable during the component's lifecycle
  const resolvedVariant = useMemo(() => resolveAutoVariant(variant), [variant])
  
  const effect = useTextEffect({
    variant: resolvedVariant,
    trigger,
    basePath,
    initiallyVisible,
    visibilityRootMargin,
    visibilityThreshold,
  })
  const nodeRef = useRef(null)

  const setNode = useCallback(
    (node) => {
      effect.ref(node)
      nodeRef.current = node
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else if (forwardedRef) {
        forwardedRef.current = node
      }
    },
    [effect, forwardedRef],
  )

  useImperativeHandle(
    effectRef,
    () => ({
      animateIn: effect.animateIn,
      animateOut: effect.animateOut,
      ready: effect.ready,
      element: nodeRef.current,
    }),
    [effect, nodeRef],
  )

  return (
    <Component ref={setNode} className={cn('relative', className)} {...rest}>
      {children}
    </Component>
  )
})

export default TextEffect
