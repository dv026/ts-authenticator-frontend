import { ApiKeyStore } from "./api-key-store"
import { ModalStore } from "./modal-store"
import { AuthStore } from "./auth-store"

export class RootStore {
  constructor() {}
  authStore: AuthStore = new AuthStore()
  modalStore: ModalStore = new ModalStore()
  apiKeyStore: ApiKeyStore = new ApiKeyStore(this)
}

const rootStore = new RootStore()

export const useStore = () => rootStore
