import { Modal as AntdModal, Input } from "antd"
import { useStore } from "../../app/stores/root-store"
import { observer } from "mobx-react-lite"
import { useState } from "react"

interface InputModalProps {
  onSubmit: (value: string) => void
  title: string
}

export const InputModal: React.FC<InputModalProps> = observer(
  ({ onSubmit, title }) => {
    const { modalStore } = useStore()
    const [value, setValue] = useState("")
    const { isModalOpen, closeModal } = modalStore

    const handleOk = () => {
      onSubmit(value)
      modalStore.closeModal()
    }

    return (
      <AntdModal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => modalStore.closeModal()}
      >
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
      </AntdModal>
    )
  }
)
