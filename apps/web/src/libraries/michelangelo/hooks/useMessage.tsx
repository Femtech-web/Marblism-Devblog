'use client'

import { RouterService } from '@web/core/router'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { closeSnackbar } from 'notistack'
import { useEffect } from 'react'

/**
 * Emit request when the path changed
 */
export const useMessageSend = ({ canRun }: { canRun: boolean }) => {
  const pathname = usePathname()
  const params: any = useParams()

  useEffect(() => {
    if (canRun) {
      window.parent.postMessage({ type: 'ready' }, '*')
    }
  }, [canRun])

  useEffect(() => {
    if (!canRun) {
      return
    }

    const url = `${window.location.origin}${pathname}`

    const pathPure = RouterService.restoreUrl(pathname, params)

    window.parent.postMessage({ type: 'navigation', url, pathPure }, '*')
  }, [pathname, params])
}

/**
 * Change the path on request
 */
export const useMessageReceived = ({ canRun }: { canRun: boolean }) => {
  const router = useRouter()

  const handleMessage = event => {
    const canContinue = event?.data?.type === 'navigation'

    if (canContinue) {
      const path = event.data.path?.trim()

      if (path && path !== '') {
        router.push(path)
        closeSnackbar()
      }
    }
  }

  useEffect(() => {
    if (canRun) {
      window.addEventListener('message', handleMessage)
    }

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [canRun])
}
