import AccountState from '@/context/account/AccountState'
import ProviderState from '@/context/provider/ProviderState'
import TypeState from '@/context/type/TypeState'
import '@/styles/globals.css'
import { LightNodeProvider } from "@waku/react";

const NODE_OPTIONS = { defaultBootstrap: true };


export default function App({ Component, pageProps }) {
  return (
    <ProviderState>
      <AccountState>
        <TypeState>
          <LightNodeProvider options={NODE_OPTIONS}>
            <Component {...pageProps} />
          </LightNodeProvider>
        </TypeState>
      </AccountState>
    </ProviderState>
  )
}
