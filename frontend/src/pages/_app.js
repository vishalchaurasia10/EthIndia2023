import AccountState from '@/context/account/AccountState'
import ProviderState from '@/context/provider/ProviderState'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ProviderState>
      <AccountState>
        <Component {...pageProps} />
      </AccountState>
    </ProviderState>
  )
}
