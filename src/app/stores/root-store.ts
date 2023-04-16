import { ModalStore } from "./modal-store"
import { AuthStore } from "./user-store"

export class RootStore {
  constructor() {}
  authStore: AuthStore = new AuthStore()
  modalStore: ModalStore = new ModalStore()
}

const rootStore = new RootStore()

export const useStore = () => rootStore