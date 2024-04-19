import { useConfiguration } from '@web/core/configuration'
import { ReactNode } from 'react'
import { useLogin } from './hooks/useLogin'
import { useMessageReceived, useMessageSend } from './hooks/useMessage'

type Props = {
  children: ReactNode
}

const useMichelangelo = () => {
  const configuration = useConfiguration()

  if (!configuration.isMarblismMichelangeloActive) {
    return
  }

  const login = useLogin()

  useMessageSend({ canRun: login.isReady })

  useMessageReceived({ canRun: login.isReady })

  return <></>
}

export const MichelangeloProvider: React.FC<Props> = ({ children }) => {
  useMichelangelo()

  return <>{children}</>
}
