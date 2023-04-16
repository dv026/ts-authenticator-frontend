import { makeAutoObservable } from 'mobx'

export class ModalStore {
  isModalOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  setModalOpen(val: boolean) {
    this.isModalOpen = val
  }

  openModal() {
    this.setModalOpen(true)
  }

  closeModal() {
    this.setModalOpen(false)
  }
}