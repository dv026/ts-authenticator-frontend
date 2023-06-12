import { ApiKeyModel, apiKeyApi } from "@/entities";
import { Nullable } from "@/types/common";
import { makeAutoObservable, reaction } from "mobx";
import { RootStore } from "./root-store";

export class ApiKeyStore {

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore

    reaction(() => this.currentApiKeyId, (id) => {
      if (id) {
        apiKeyApi.get(id).then((response: any) => this.setCurrentApiKey(response.apiKey))
      }
    })
  }

  rootStore: RootStore
  currentApiKeyId: Nullable<string> = null
  currentApiKey: Nullable<ApiKeyModel> = null

  apiKeys: ApiKeyModel[] = []

  setCurrentApiKeyId(id: string) {
    this.currentApiKeyId = id
  }

  setCurrentApiKey(apiKey: ApiKeyModel) {
    this.currentApiKey = apiKey
  }

  setApiKeys = (apiKeys: ApiKeyModel[]) => {
    this.apiKeys = apiKeys
  }

  getKeys() {
    const userId = this.rootStore.authStore.user?._id
    if (userId) {
      apiKeyApi.getAll(userId).then((response: any) => {
        if (response && response.length) {
          this.setApiKeys(response)
        }
      }).catch(() => console.log('error test'))
    }
  }
}