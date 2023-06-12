import { Form, Select } from "antd"
import { observer } from "mobx-react-lite"
import { FC, useEffect, useMemo } from "react"

import { useStore } from "@/app/stores"

import { styles } from "./styles"

export const ApiKeyChooser: FC = observer(() => {
  const { apiKeyStore } = useStore()

  useEffect(() => {
    apiKeyStore.getKeys()
  }, [])

  const apiKeyOptions = useMemo(
    () =>
      apiKeyStore.apiKeys.map((key) => ({
        label: key.name,
        value: key._id,
      })),
    [apiKeyStore.apiKeys]
  )

  return (
    <Form.Item label="API key">
      <Select
        css={styles.apiKeyChooser}
        onChange={(value) => apiKeyStore.setCurrentApiKeyId(value)}
        options={apiKeyOptions}
        value={apiKeyStore.currentApiKeyId}
      />
    </Form.Item>
  )
})
