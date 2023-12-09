import AccountState from '@/context/account/AccountState'
import ProviderState from '@/context/provider/ProviderState'
import TypeState from '@/context/type/TypeState'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ProviderState>
      <AccountState>
        <TypeState>
          <Component {...pageProps} />
        </TypeState>
      </AccountState>
    </ProviderState>
  )
}
